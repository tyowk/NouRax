module.exports = {
    name: '$isInteraction',
    type: 'djs',
    code: async d => {
        const data = d.util.aoiFunc(d);
        const code = d.util.setCode(data);

        const interaction = d.data.interaction;
        if (!interaction) return { code };

        let message = {
            content: code?.addBrackets(),
            embeds: d.embeds,
            files: d.files,
            components: d.components,
            attachments: d.files,
            flags: d.data.flags
        };

        if (d.data.dm?.status === true) {
            let member = interaction?.member;

            if (d.data.dm?.user !== interaction.user.id) {
                member = await d.client.users.cache.get(d.data.dm?.user);
            }

            if (!member) return { code };

            await interaction?.member?.send(message).catch(() => {});
            return { code };
        }

        if (interaction.deferred) {
            message = await interaction?.editReply(message).catch(() => {});
        } else {
            message = await interaction?.reply(message).catch(() => {});
        }

        if (d.data.deleteIn) {
            setTimeout(() => message?.delete()?.catch(() => {}), d.data.deleteIn);
        }

        return { code };
    }
};
