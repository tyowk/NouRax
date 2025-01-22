module.exports = {
    name: '$onlyIf',
    type: 'djs',
    code: async d => {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);
        let error = false;

        let [condition, err = ''] = data.inside.splits;

        if (!eval(d.helpers.checkCondition.solve(d.helpers.mustEscape(condition)))) {
            error = true;
            if (err?.trim() === '') {
            } else {
                if (!err.includes('{interaction}') && d.data.interaction) err += '{interaction}';
                if (d.data.interaction && d.data.interaction?.deferred) {
                    d.data.interaction.reply = d.data.interaction?.editReply?.bind(d.data.interaction);
                }
                const errorMsg = await d.util.errorParser(err, d);
                d.aoiError.makeMessageError(d.client, d.channel, errorMsg.data || errorMsg, errorMsg.options, d);
            }
        }

        return {
            code: d.util.setCode(data),
            error
        };
    }
};
