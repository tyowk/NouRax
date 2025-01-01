const { AoiClient } = require('aoi.js');
const { Manager } = require('aoijs.lavalink');
const { Handlers } = require('./handlers');
const { ClusterClient, getInfo } = require('discord-hybrid-sharding');
const config = require('./config');
// const { Database } = require('aoijs.mysql');

const client = new AoiClient({
    token: config.token,
    prefix: [
        config.prefix,
        '<@$clientId>',
        // '$getGuildVar[prefix]',
    ],
    intents: ['Guilds', 'GuildMessages', 'GuildVoiceStates', 'DirectMessages', 'MessageContent'],
    events: ['onMessage', 'onInteractionCreate', 'onVoiceStateUpdate', 'onGuildJoin', 'onGuildLeave'],
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: false,
    },
    disableAoiDB: true,
    suppressAllErrors: config.debug ? false : true,
    aoiLogs: config.debug,
    shards: getInfo().SHARD_LIST,
    shardCount: getInfo().TOTAL_SHARDS,
});

/*
new Database(client, {
    url: config.database,
    tables: ['main'],
    debug: config.debug,
});
*/

new Manager(client, {
    nodes: config.nodes,
    searchEngine: 'spotify',
    maxQueueSize: 1000,
    maxPlaylistSize: 1000,
    debug: config.debug,
    voiceConnectionTimeout: 60,
    reconnectInterval: 20,
    reconnectTries: 200,
});

client.cluster = new ClusterClient(client);
Handlers(client, config);
client.loadCommands('src/commands/client', config.debug);
client.loadVoiceEvents('src/commands/player', config.debug);
