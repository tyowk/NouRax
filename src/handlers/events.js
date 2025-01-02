const { green } = require('chalk');

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
╚═╝░░╚═╝╚═╝░░╚═╝╚═l╝░░╚═╝
• Status:     ${green('Ready!')}
• Shard(s):   ${client.cluster.id}
• Cluster(s): ${client.cluster.count}
        `);
        console.log(' ');
    });
};
