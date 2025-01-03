require('dotenv').config();

module.exports = {
    token: process.env.TOKEN,
    clientId: process.env.CLIENT_ID,
    prefix: process.env.PREFIX,
    database: process.env.DATABASE,
    debug: process.env.DEBUG === 'true' ? true : false,
    port: Number(process.env.PORT),
    geniusApi: process.env.GENIUS_API,
    nodes: require('./nodes.js'),
    emojis: require('./emojis.js'),

    topgg: {
        token: process.env.TOPGG_TOKEN,
        auth: process.env.TOPGG_AUTH,
    },

    logs: {
        ready: '1238488401729163454',
        nodes: '1318500565290057738',
        join: '1311333193768763464',
        leave: '1311333221333729310',
        vote: '1301780094540451860',
        error: '1311333270381658252',
    },
};
