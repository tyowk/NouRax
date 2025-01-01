const { TopggClient } = require('./topgg.js');
const { REST, Routes, Collection } = require('discord.js');
const { Client: GeniusClient } = require('genius-lyrics');
const fs = require('node:fs');
const path = require('node:path');

exports.Handlers = (client, config) => {
    client.config = config;
    client.os = require('os');
    client.lyrics = new GeniusClient(config.geniusApi);
    client.timeout = new Collection();
    client.status(...require('./statuses.js'));
    client.functionManager.createFunction(...require('./functions.js'));
    client.on('interactionCreate', interaction => require('./interaction.js')(interaction, client));
    TopggClient(client, config);
    client.body = [];
    loadCommands(client);
    registerCommands(client);

    // client.variables((require('./variables.js'));
};

function loadCommands(client, basePath = path.join(process.cwd(), 'src/commands/client')) {
    const files = fs.readdirSync(basePath);
    for (const file of files) {
        if (file === 'owner' || file === 'events') continue;
        const filePath = path.join(basePath, file);
        const cmdPath = fs.readdirSyc;
        if (fs.statSync(filePath).isDirectory()) {
            loadCommands(client, filePath);
        } else {
            let cmd = require(filePath);
            if (Array.isArray(cmd)) cmd = cmd[0];
            if (cmd.type || !cmd.name || !cmd.description) continue;
            client.body.push({
                name: cmd.name,
                description: cmd.description || 'No description provide',
                type: 1,
                options: cmd.options || [],
            });
        }
    }
}

function registerCommands(client) {
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
        body: client.body,
    });
}
