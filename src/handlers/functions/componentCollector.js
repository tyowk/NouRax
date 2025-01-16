module.exports = {
    name: '$componentCollector',
    type: 'djs',
    code: async d => {
        const code = d.command.code;
        const inside = d.unpack();
        const err = d.inside(inside);
        if (err) return d.error(err);

        let [messageID, filter, time, idle, customIDs, cmds, errorMsg = '{}', endcommand = '', awaitData = '{}'] =
            inside.splits;
        time = d.helpers.time.parse(time)?.ms || time;
        idle = d.helpers.time.parse(idle)?.ms || idle;
        if (!time) return d.aoiError.fnError(d, 'custom', { inside }, `Invalid Time provided In`);
        errorMsg = await d.util.errorParser(errorMsg, d);
        awaitData = JSON.parse(awaitData);
        cmds = cmds.split(',');
        cmds.forEach(x => {
            if (d.client.cmd.awaited.find(y => y.name === x)) {
                undefined;
            } else {
                d.aoiError.fnError(d, 'custom', {}, `Could not find awaitedCommand ${x}`);
            }
        });
        customIDs = customIDs.split(',');

        const message = d.channel.messages.cache.get(messageID) || (await d.channel.messages.fetch(messageID));
        if (!message) return d.aoiError.fnError(d, 'custom', {}, `Could not find message with ID ${messageID}`);

        const collector = message.createMessageComponentCollector({
            filter: interaction => {
                return customIDs.includes(interaction.customId.split('_')[0]);
            },
            idle,
            time,
        });

        collector.on('collect', async interaction => {
            if (errorMsg && filter !== 'everyone' ? interaction.user.id !== filter : false) {
                if (d.data.interaction?.deferred) {
                    d.data.interaction.reply = d.data.interaction?.editReply?.bind(d.data.interaction);
                }

                return d.aoiError.makeMessageError(d.client, d.channel, errorMsg.data || errorMsg, errorMsg.options, d);
            }

            const cmd = d.client.cmd.awaited.find(
                x => x.name === cmds[customIDs.indexOf(interaction.customId.split('_')[0])],
            );
            if (!cmd) return;
            await d.interpreter(
                d.client,
                {
                    author: interaction.user,
                    message: interaction.message,
                    channel: interaction.channel,
                    guild: interaction.guild,
                    member: interaction.member,
                    client: d.client,
                },
                [],
                cmd,
                undefined,
                false,
                undefined,
                {
                    ...d.data,
                    interaction,
                    awaitData,
                },
                undefined,
            );
        });

        if (endcommand !== '') {
            collector.once('end', async (endData, reason) => {
                if (reason === 'time' || reason === 'idle') {
                    const endcmd = d.client.cmd.awaited.find(x => x.name === endcommand);
                    if (!endcmd) return;
                    await d.interpreter(
                        d.client,
                        {
                            author: message.author,
                            message,
                            channel: message.channel,
                            guild: message.guild,
                            member: message.member,
                            client: d.client,
                        },
                        [],
                        endcmd,
                        undefined,
                        false,
                        undefined,
                        {
                            ...d.data,
                            endData,
                            awaitData,
                        },
                        undefined,
                    );
                }
            });
        }

        return {
            code: d.util.setCode({ function: d.func, code, inside }),
        };
    },
};
