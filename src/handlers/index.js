const { REST, Routes, Collection } = require('discord.js');
const { TopggClient } = require('./topgg.js');
const { ClientEvents } = require('./events.js');
const { GetLyrics } = require('./lyrics.js');
const { readdirSync, statSync } = require('node:fs');
const { join } = require('node:path');
const { red } = require('chalk');

exports.Handlers = (client, config) => {
    loadAntiCrash(config);
    client.config = config;
    client.os = require('os');
    client.timeout = new Collection();
    client.lyrics = GetLyrics;
    client.status(...require('./statuses.js'));
    client.functionManager.createFunction(...require('./functions.js'));
    client.on('interactionCreate', interaction => require('./interaction.js')(interaction, client));

    TopggClient(client, config);
    ClientEvents(client, config);
    client.body = [];
    loadCommands(client);
    registerCommands(client);
};

function loadAntiCrash(config) {
    if (config.debug) return;
    process.on('unhandledRejection', (reason, promise) => {
        console.error(`[${red('ERROR')}] :: Unhandled Rejection at:`, promise, `reason:`, reason);
    });

    process.on('uncaughtException', err => {
        console.error(`[${red('ERROR')}] :: Uncaught Exception:`, err);
    });
}

function loadCommands(client, basePath = join(process.cwd(), 'src/commands/client')) {
    const files = readdirSync(basePath);

    files.forEach(file => {
        if (file === 'owner' || file === 'events') return;

        const filePath = join(basePath, file);

        if (statSync(filePath).isDirectory()) {
            loadCommands(client, filePath);
        } else {
            let cmd = require(filePath);
            if (Array.isArray(cmd)) cmd = cmd[0];
            if (cmd.type || !cmd.name || !cmd.description) return;

            client.body.push({
                name: cmd.name,
                description: cmd.description || 'No description provided',
                type: 1,
                options: cmd.options || [],
            });
        }
    });
}

function registerCommands(client) {
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
        body: client.body,
    });
}
