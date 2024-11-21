exports.ClientEvents = class Events {
    constructor(client) {
        this.client = client;
        this.db = client.db;
        this.config = client.config;
        this.color = this.config.color;
        client.on('messageCreate', (...args) => this.events_1(...args));
    }
    
    async events_1(message) {
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
}