const { AoiClient } = require('aoi.js');
const { Manager } = require('aoijs.lavalink');
// const { Database } = require('aoijs.mysql');
const { Handlers } = require('./handlers');
const { ClusterClient, getInfo } = require('discord-hybrid-sharding');
const config = require('./config');

const client = new AoiClient({
    token: config.token,
    prefix: [config.prefix, '<@$clientId>'],
    intents: ['Guilds', 'GuildMessages', 'GuildVoiceStates', 'DirectMessages', 'MessageContent'],
    events: ['onMessage', 'onInteractionCreate', 'onVoiceStateUpdate', 'onGuildJoin', 'onGuildLeave'],
    disableAoiDB: true,
    suppressAllErrors: config.debug ? false : true,
    aoiLogs: config.debug,
    shards: getInfo().SHARD_LIST,
    shardCount: getInfo().TOTAL_SHARDS,
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: false
    }
});

/*new Database(client, {
    url: config.database,
    tables: ['config', 'playlist'],
    debug: config.debug
});*/

new Manager(client, {
    nodes: config.nodes,
    searchEngine: 'spotify',
    maxQueueSize: 1000,
    maxPlaylistSize: 1000,
    debug: config.debug,
    voiceConnectionTimeout: 60,
    reconnectInterval: 20,
    reconnectTries: 200,
    userAgent: 'NouRax',
    moveOnDisconnect: true,
    noLimitVolume: false,
    /*playlist: {
        enable: true,
        table: 'playlist',
        maxSongs: 20,
        maxPlaylist: 5
    }*/
});

client.shard = new ClusterClient(client);
Handlers(client, config);
client.loadCommands('src/commands/client', config.debug);
client.loadVoiceEvents('src/commands/player', config.debug);
