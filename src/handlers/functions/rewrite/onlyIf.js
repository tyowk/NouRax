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
            if (err?.trim() !== '') {
                if (!err.includes('{interaction}') && d.data.interaction) err += '{interaction}';
                err = await d.util.errorParser(err, d);

                if (d.data.interaction && d.data.interaction?.deferred) {
                    d.data.interaction.reply = d.data.interaction?.editReply?.bind(d.data.interaction);
                    err.options.defer = false;
                }
                d.aoiError.makeMessageError(d.client, d.channel, err.data || err, err.options, d);
            }
        }

        return {
            code: d.util.setCode(data),
            error
        };
    }
};
