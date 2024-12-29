const { ClusterManager } = require('discord-hybrid-sharding');
const config = require('./config');
const chalk = require('chalk');

const manager = new ClusterManager(`${__dirname}/client.js`, {
    totalShards: 'auto',
    shardsPerClusters: 2,
    mode: 'process',
    token: config.token,
});

manager.on('clusterCreate', cluster => {
    if (!config.debug) return;
    console.log(`[${chalk.blue('DEBUG')}] :: Launched Cluster ${chalk.cyan(cluster.id)}`);
});

manager.spawn({ timeout: -1 });
