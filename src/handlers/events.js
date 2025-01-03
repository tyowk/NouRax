const { green, cyan } = require('chalk');

class NouRax extends Error {
    constructor(data) {
        super(data.error);
        this.name = this.constructor.name;
        this.command = data.command;
        this.channel = data.channel?.id;
        this.function = data.function;
        this.guild = data.guild?.id;
        Error.captureStackTrace(this, this.constructor);
    }
}

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

    client.on('functionError', data => {
        if (!config.debug) return;
        throw new NouRax(data);
    });
};
