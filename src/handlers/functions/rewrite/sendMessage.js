module.exports = {
    name: '$sendMessage',
    type: 'djs',
    code: async d => {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);

        let [message, returnID = 'false'] = data.inside.splits;

        if (!message.includes('{interaction}') && d.data.interaction) message += '{interaction}';
        if (d.data.interaction && d.data.interaction?.deferred) {
            d.data.interaction.reply = d.data.interaction?.editReply?.bind(d.data.interaction);
        }

        message = await d.util.errorParser(message, d);
        if ((!message?.data && !message) || !message?.options)
            return d.aoiError.fnError(
                d,
                'custom',
                { inside: data.inside },
                'Parser did not pass any data, meaning your parser usage is wrong'
            );

        const msg = await d.aoiError.makeMessageError(
            d.client,
            d.channel,
            message?.data || message,
            message?.options,
            d
        );
        data.result = (returnID === 'true' ? msg?.id : '') || '';

        return {
            code: d.util.setCode(data)
        };
    }
};
