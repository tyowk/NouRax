//const variables = require('./variables.js');
const functions = require('./functions.js');
const statuses = require('./statuses.js');
const Topgg = require('./topgg.js');
const { REST, Routes, Collection } = require('discord.js');
const { Client } = require('genius-lyrics');
const fs = require('node:fs');
const path = require('node:path');

exports.Handlers = (client, config) => {
    client.config = config;
    client.os = require('os');
    //client.variables(variables);
    client.lyrics = new Client(process.env.GENIUS_API);
    client.timeout = new Collection();
    statuses.forEach(x => client.status(x));
    functions.forEach(x => client.functionManager.createFunction(x));
    client.on('interactionCreate', interaction => require('./interaction.js')(interaction, client));
    Topgg(client, config);
    client.body = [];
    loadCommands(client);
    registerCommands(client);
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
