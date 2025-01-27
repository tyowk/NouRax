module.exports = {
    name: '$componentCollector',
    type: 'djs',
    code: async d => {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);

        let [
            messageID,
            filter = 'everyone',
            time,
            idle,
            customIDs,
            cmds,
            errorMsg = '{}',
            endcommand = '',
            awaitData = '{}'
        ] = data.inside.splits;
        time = d.helpers.time.parse(time)?.ms || Number(time);
        idle = d.helpers.time.parse(idle)?.ms || Number(idle);
        if ((!time && !idle) || isNaN(time) || isNaN(idle))
            return d.aoiError.fnError(d, 'custom', { inside }, `Invalid Time provided In`);

        errorMsg = await d.util.errorParser(errorMsg, d);
        cmds = cmds ? cmds.split(',') : [];
        filter = filter ? filter.split(',') : [];
        customIDs = customIDs ? customIDs.split(',') : [];

        try {
            awaitData = JSON.parse(awaitData);
        } catch {
            awaitData = {};
        }

        for (const cmd of cmds) {
            if (d.client.cmd.awaited.find(y => y.name === cmd)) continue;
            d.aoiError.fnError(d, 'custom', { inside: data.inside }, `Could not find awaitedCommand: ${cmd}`);
        }

        const message =
            d.channel.messages.cache.get(messageID) || (await d.channel.messages.fetch(messageID).catch(() => {}));
        if (!message || !(message instanceof require('discord.js').Message))
            return d.aoiError.fnError(d, 'custom', { inside }, `Could not find message with ID: ${messageID}`);

        const collector = message.createMessageComponentCollector({
            filter: interaction => {
                return customIDs.includes(interaction.customId.split('_')[0]);
            },
            idle,
            time
        });

        collector.on('collect', async interaction => {
            if (filter.length > 0 && !filter.includes('everyone') && !filter.includes(interaction.user.id)) {
                if (interaction.deferred) {
                    interaction.reply = interaction.editReply.bind(interaction);
                    errorMsg.options.defer = false;
                }

                return d.aoiError.makeMessageError(d.client, d.channel, errorMsg.data || errorMsg, errorMsg.options, {
                    ...d,
                    data: { ...d.data, interaction }
                });
            }

            const cmd = d.client.cmd.awaited.find(
                x => x.name === cmds[customIDs.indexOf(interaction.customId.split('_')[0])]
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
                    client: d.client
                },
                [],
                cmd,
                undefined,
                false,
                undefined,
                {
                    ...d.data,
                    interaction,
                    awaitData
                },
                undefined
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
                            client: d.client
                        },
                        [],
                        endcmd,
                        undefined,
                        false,
                        undefined,
                        {
                            ...d.data,
                            endData,
                            awaitData
                        },
                        undefined
                    );
                }
            });
        }

        return {
            code: d.util.setCode({ function: d.func, code: data.code, inside: data.inside })
        };
    }
};
