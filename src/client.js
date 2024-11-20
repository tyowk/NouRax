const { DiscordClient } = require('./classes/Client.js');
const { Config } = require('./config');

const client = new DiscordClient({
    token: Config.token,
    prefix: Config.prefix,
    production: Config.production,
    debug: Config.debug,
    dir: 'src/commands',
    intents: [
        'Guilds',
        'GuildMessages',
        'GuildMembers',
        'GuildVoiceStates',
        'MessageContent'
    ],
    events: [
        'onMessage',
        'onInteractionCreate',
        'onVoiceStateUpdate'
    ],
    mysql: {
        url: Config.database.uri,
        tables: Config.database.tables
    },
    music: {
        nodes: Config.music.nodes,
        searchEngine: Config.music.searchEngine,
        maxQueueSize: Config.music.maxQueueSize,
        maxPlaylistSize: Config.music.maxPlaylistSize
    }
});