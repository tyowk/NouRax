module.exports = async (interaction, client) => {
    if (!interaction.inGuild() || !interaction.isChatInputCommand()) return;
    try {
        client.interactionManager.resolve(interaction);
        const cmds = client.cmd.default
            .filter(x => x.name?.toLowerCase() === interaction.commandName?.toLowerCase())
            .V();
        if (!cmds.length) return;
        const data = {
            client: client,
            guild: interaction.guild,
            message: interaction?.message,
            channel: interaction.channel,
            author: interaction.author,
            member: interaction.member,
            isAutocomplete: interaction.isAutocomplete()
        };

        for (const cmd of cmds) {
            if (
                (!!cmd.sub_command && interaction.options._subcommand !== cmd.sub_command) ||
                (!!cmd.sub_command_group && interaction.options._group !== cmd.sub_command_group)
            )
                continue;
            if (cmd.defer === true) await interaction.deferReply().catch(() => {});

            if (cmd.name?.includes('$')) {
                cmd.name = (
                    await client.functionManager.interpreter(
                        client,
                        data,
                        [],
                        { code: cmd.name, name: 'NameParser' },
                        client.db,
                        true,
                        undefined,
                        { interaction }
                    )
                )?.code;
            }

            await client.functionManager.interpreter(
                client,
                data,
                interaction.values ||
                    interaction.options?._hoistedOptions?.map(x => x.value) || [interaction.customId] ||
                    [],
                cmd,
                client.db,
                true,
                undefined,
                { interaction },
                undefined,
                undefined,
                undefined,
                undefined,
                false
            );
        }
    } catch (err) {
        await interaction.reply({
            content: `🚫  An error occured: ${err.message || 'unknown error'}`,
            flags: 64
        });
    }
};
