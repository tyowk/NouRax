const { ClientShard } = require('aoi.js');
const { Config } = require('./config.js');
const { blue, cyan } = require('chalk');

const sharder = new ClientShard('dist/client.js', {
    token: Config.token,
    totalShards: 'auto'
});

sharder.on('shardCreate', (shard) => {
    if (Config.debug) console.log(`[${blue('DEBUG')}] :: Launched shard: ${cyan(shard.id)}`);
});

sharder.startProcess();
