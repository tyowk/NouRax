const { ClusterManager } = require('discord-hybrid-sharding');
const { token, debug } = require('./config');
const { blue, cyan } = require('chalk');

const manager = new ClusterManager(`${__dirname}/client.js`, {
    totalShards: 'auto',
    shardsPerClusters: 2,
    mode: 'process',
    token,
});

manager.on('clusterCreate', cluster => {
    if (!debug) return;
    console.log(`[${blue('DEBUG')}] :: Launched Cluster ${cyan(cluster.id)}`);
});

manager.spawn({ timeout: -1 });
