module.exports = {
    name: '$isInteraction',
    type: 'djs',
    code: async d => {
        const data = d.util.aoiFunc(d);
        let content = data.inside?.inside?.addBrackets();

        let send = {
            content,
            embeds: d.embeds,
            files: d.files,
            components: d.components,
            attachments: d.files,
            flags: d.data.flags
        };

        if (!d.data.interaction) return d.client.returnCode(d, data);

        if (d.data.dm === true) {
            await d.data.interaction?.member?.send(send).catch(() => {});
            send = {
                embeds: [
                    {
                        description: `${d.client?.config?.emojis?.yes || '🐋'}  Please check your DM's!`,
                        color: 0x4367fe
                    }
                ],
                flags: 64
            };
        }

        if (d.data.interaction.deferred) {
            send = await d.data.interaction?.editReply(send).catch(() => {});
        } else {
            send = await d.data.interaction?.reply(send).catch(() => {});
        }

        if (d.data.deleteIn) setTimeout(() => send?.delete()?.catch(() => {}), d.data.deleteIn);
        return {
            code: d.util.setCode(data)
        };
    }
};
