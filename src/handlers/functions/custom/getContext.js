module.exports = {
    name: '$getContext',
    type: 'djs',
    code: (d, args = d.args, interaction = d.data.interaction) => {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);

        let [option, msg = 'all', index = '1', returnSelf = 'false'] = data.inside.splits;

        option = option?.addBrackets()?.toLowerCase();
        msg = msg?.addBrackets()?.toLowerCase()?.split(':');

        const extractUrl = str => {
            const matched = str.match(/<(https?:\/\/[^>]+)>/);
            return matched ? matched[1] : null;
        };

        switch (true) {
            case !!interaction:
                if (option === 'false' || option === 'none') {
                    return d.client.returnCode(d, data);
                }

                switch (option) {
                    case 'subcommand':
                        data.result = interaction.options.getSubcommand();
                        break;
                    default:
                        data.result = interaction.options.get(option?.addBrackets())?.value;
                        break;
                }
                break;

            case msg[0] === 'mentioned':
                const userIndex = Number(index || msg[1] || 1) - 1;
                const mentionedUser = [...d.mentions.users.values()][userIndex];

                if (mentionedUser) {
                    data.result = mentionedUser.id;
                } else if (returnSelf === 'true' || msg[2] === 'true') {
                    data.result = d.author?.id;
                } else {
                    data.result = '';
                }
                break;

            case msg === 'false' || msg === 'none':
                return d.client.returnCode(d, data);

            default:
                msg = msg.join(':');
                data.result = msg === 'all' ? d.args.join(' ') : args[Number(msg) - 1];
                break;
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
