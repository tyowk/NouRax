const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { createServer } = require('http');

exports.TopggClient = (client, config) => {
    if (client.shard && client.shard?.id !== 0) return;

    const server = createServer(async (req, res) => {
        if (req.method !== 'POST' || req.url !== '/webhook') return;

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            try {
                const vote = JSON.parse(body);
                const auth = req.headers['authorization'];
                if (!auth || auth !== config.topgg.auth) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ code: 401, message: 'Unauthorized' }));
                }

                if (!vote || !vote.user) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ code: 400, message: 'Bad Request' }));
                }

                const user = client.users.cache.get(vote.user) || (await client.users.fetch(vote.user));
                if (!user) return;

                const channel =
                    client.channels.cache.get(config.logs.vote) || (await client.channels.fetch(config.logs.vote));
                if (!channel) return;

                const embed = new EmbedBuilder()
                    .setDescription(
                        `Thanks for voting for me, <@${user.id}>! Your support keeps this bot running and improving every day. We're working hard to bring you even better features.\n\nYou can [vote](https://top.gg/bot/${client.user.id}/vote) again <t:${((Date.now() + 43200000) / 1000).toFixed()}:R>`
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
                        .setEmoji(config.emojis.topgg)
                );

                await channel
                    .send({
                        embeds: [embed],
                        content: `<@${user.id}>`,
                        components: [row]
                    })
                    .catch(() => {});

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 200, message: 'OK' }));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ code: 500, message: 'Internal Server Error' }));
            }
        });
    });

    server.listen(config.port);
};
