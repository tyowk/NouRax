exports.ClientEvents = class Events {
    constructor(client) {
        this.client = client;
        this.db = client.db;
        this.config = client.config;
        this.color = this.config.color;
        
        client.on('messageCreate', (...args) => this.event_1(...args));
        client.on('ready', () => this.event_2(client));
    }
    
    async event_1(message) {
        const prefix = await this.db.get('main', 'prefix', message.guild?.id);
        const mention = new RegExp(`^<@!?${this.client.user.id}>( |)$`);
        if (!message?.content?.match(mention)) return;
        await message.reply({
            embeds: [{
                description: `**:wave: | Hello i'm Rax!**\nMy prefix for this guild is **\`${prefix.value}\`**\nWant more info? then do **\`${prefix.value}help\`**`,
                color: parseInt(this.color.main.replace('#', ''), 16)
            }]
        });
    }
    
    async event_2(client) {
        if (client.debug) return;
        const { Logger } = require('aoijs.mysql/src/classes/Logger');
        Logger([
            { text: `Latency; ${client.ws.ping}ms`, textColor: 'green' },
            { text: `Database ${await client.db.db.avgPing()}ms`, textColor: 'green' },
            { text: `Successfully connected to Discord`, textColor: 'blue' },
        ], { text: ' NouRax ', textColor: 'cyan' });
    }
}