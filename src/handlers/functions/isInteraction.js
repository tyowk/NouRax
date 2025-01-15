module.exports = {
    name: '$isInteraction',
    type: 'djs',
    code: async d => {
        const data = d.util.aoiFunc(d);
        let content = data.inside.splits;

        let send = {
            embeds: d.embeds,
            files: d.files,
            components: d.components,
        };

        if (!d.data.interaction) return d.client.returnCode(d, data);
        if (content && content?.length) send.content = content?.join(';')?.addBrackets();
        if (d.data.dm === true) {
            await d.data.interaction?.member?.send(send).catch(() => {});
            send = {
                embeds: [
                    {
                        description: `Please check your DM's!`,
                        color: 0x4367fe,
                    },
                ],
            };
        }

        const msg = await d.data.interaction?.editReply(send).catch(() => {});
        if (d.data.deleteIn) setTimeout(() => msg?.delete()?.catch(() => {}), d.data.deleteIn);
        return {
            code: d.util.setCode(data),
        };
    },
};
