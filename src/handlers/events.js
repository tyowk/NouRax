const { green, cyan } = require('chalk');

exports.ClientEvents = (client, config) => {
    client.on('ready', () => {
        if (config.debug) return;
        console.log(' ');
        console.log(`
██████╗░░█████╗░██╗░░██╗
██╔══██╗██╔══██╗╚██╗██╔╝
██████╔╝███████║░╚███╔╝░
██╔══██╗██╔══██║░██╔██╗░
██║░░██║██║░░██║██╔╝╚██╗
╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚═╝
• Status:     ${green('Ready!')}
• Shard(s):   ${cyan(client.cluster.id)}
• Cluster(s): ${cyan(client.cluster.count)}
        `);
        console.log(' ');
    });
};
