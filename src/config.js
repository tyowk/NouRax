require('dotenv').config();

exports.Config = {
    token: process.env.TOKEN,
    prefix: [process.env.PREFIX, '<@$clientId>', '$getGuildVar[prefix]'],
    production: parse(process.env.PRODUCTION),
    debug: parse(process.env.DEBUG),
    
    database: {
        uri: process.env.DATABASE,
        tables: ['main', 'economy', 'music']
    },

    color: {
        main: '#3b3ee3',
        red: '#e33b54',
        yellow: '#e3bc3b',
        green: '#3be38c',
        blue: '#3ba8e3'
    },

    music: {
        nodes: [{
            name: 'NouJS',
            url: process.env.LAVALINK,
            auth: process.env.AUTH,
            secure: parse(process.env.SECURE)
        }],
        maxQueueSize: process.env.MAXQUEUE,
        maxPlaylistSize: process.env.MAXPLAYLIST,
        searchEngine: process.env.ENGINE
    }
}

function parse(value) {
    if (typeof value === 'string') value = value.trim().toLowerCase();
    switch (value) {
        case 'true': return true;
        default: return false;
    }
}
