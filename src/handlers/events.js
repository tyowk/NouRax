const { green, cyan } = require('chalk');
/*const { Campaign } = require('patreon-discord');
const { PatreonLoop } = require('./patreon.js');*/

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
    client.on('ready', async () => {
        /*client.patreon = new Campaign({
            patreonToken: config.patreon.token,
            campaignId: config.patreon.campaign,
        });

        await PatreonLoop(client, client.db);*/

        if (config.debug) return;
        console.log(' ');
        console.log(`
██████╗░░█████╗░██╗░░██╗
██╔══██╗██╔══██╗╚██╗██╔╝
██████╔╝███████║░╚███╔╝░
██╔══██╗██╔══██║░██╔██╗░
██║░░██║██║░░██║██╔╝╚██╗
╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚═╝
  • Status     : ${green('Ready!')}
  • Cluster ID : ${cyan(client.shard.id)}
  • Clusters   : ${cyan(client.shard.count)}
        `);
        console.log(' ');
    });

    client.on('functionError', data => {
        if (!config.debug) return;
        throw new NouRax(data);
    });
};
