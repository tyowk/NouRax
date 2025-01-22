require('dotenv').config();

module.exports = {
    prod: process.env.PRODUCTION === 'true' ? true : false,
    token: process.env.TOKEN,
    clientId: process.env.CLIENT_ID,
    prefix: process.env.PREFIX,
    database: process.env.DATABASE,
    debug: process.env.DEBUG === 'true' ? true : false,
    port: Number(process.env.PORT),
    nodes: require('./nodes.js'),
    emojis: require('./emojis.js'),
    topgg: require('./topgg.js'),
    logs: require('./logs.js')
    // patreon: require('./patreon.js'),
};
