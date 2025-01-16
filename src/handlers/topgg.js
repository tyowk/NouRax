const { Manager } = require('topgg.utils');
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

exports.TopggClient = (client, config) => {
    if (client.shard && client.shard?.id !== 0) return;

    client.topgg = new Manager({
        token: config.topgg.token,
        webhook: {
            endpoint: '/webhook',
            port: config.port,
            authorization: config.topgg.auth,
        },
    });

    client.topgg.on('botVote', async vote => {
        const user = await client.users.fetch(vote.userId);
        if (!user) return;

        const channel = await client.channels.fetch(config.logs.vote);
        if (!channel) return;

        const embed = new EmbedBuilder()
            .setDescription(
                `Thanks for voting for me, <@${user.id}>! Your support keeps this bot running and improving every day. We're working hard to bring you even better features.\n\nYou can [vote](https://top.gg/bot/${client.user.id}/vote) again <t:${((Date.now() + 43200000) / 1000).toFixed()}:R>`,
            )
            .setColor('#4367FE')
            .setTimestamp()
            .setThumbnail(user.displayAvatarURL())
            .setTitle(`${user.globalName || user.username} Just Voted Me!`);

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setLabel('Vote me on Top.gg!')
                .setURL(`https://top.gg/bot/${client.user.id}/vote`)
                .setEmoji(config.emojis.topgg),
        );

        await channel
            .send({
                embeds: [embed],
                content: `<@${user.id}>`,
                components: [row],
            })
            .catch(() => {});
    });
};
