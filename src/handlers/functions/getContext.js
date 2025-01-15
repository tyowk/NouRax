module.exports = {
    name: '$getContext',
    type: 'djs',
    code: d => {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.client.returnCode(d, data);
        const [option, msg = 'all'] = data.inside.splits;

        const extractUrl = str => {
            const matched = str.match(/<(https?:\/\/[^>]+)>/);
            return matched ? matched[1] : null;
        };

        if (option === 'lyrics') {
        }

        if (d.data.interaction) {
            if (option === 'false') return d.client.returnCode(d, data);
            data.result = d.data.interaction.options.get(option.addBrackets())?.value;
        } else {
            if (msg === 'false') return d.client.returnCode(d, data);
            data.result = msg === 'all' ? d.args.join(' ') : d.args[Number(msg) - 1];
        }

        if (typeof data.result === 'string') {
            const url = extractUrl(data.result);
            if (url) {
                data.result = url;
            }
        }

        return {
            code: d.util.setCode(data),
        };
    },
};
