module.exports = {
    name: '$getContext',
    type: 'djs',
    code: d => {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);
        let [option, msg = 'all', index = '1', returnSelf = 'false'] = data.inside.splits;

        option = option?.addBrackets()?.toLowerCase();
        msg = msg?.addBrackets()?.toLowerCase()?.split(':');

        const extractUrl = str => {
            const matched = str.match(/<(https?:\/\/[^>]+)>/);
            return matched ? matched[1] : null;
        };

        if (d.data.interaction) {
            if (option === 'false' || option === 'none') return d.client.returnCode(d, data);
            data.result = d.data.interaction.options.get(option.addBrackets())?.value;
        } else if (msg[0] === 'mentioned') {
            data.result =
                [...d.mentions.users.values()][Number(index || msg[1] || 1) - 1]?.id ||
                returnSelf === 'true' ||
                msg[2] === 'true'
                    ? d.author?.id
                    : '';
        } else {
            if (msg[0] === 'false' || msg[0] === 'none') return d.client.returnCode(d, data);
            data.result = msg[0] === 'all' ? d.args.join(' ') : d.args[Number(msg[0]) - 1];
        }

        if (typeof data.result === 'string') {
            const url = extractUrl(data.result);
            if (url) {
                data.result = url;
            }
        }

        return {
            code: d.util.setCode(data)
        };
    }
};
