module.exports = {
    name: '$setComponentStates',
    type: 'djs',
    code: async d => {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);

        let [state, message, channel = d.channel.id] = data.inside.splits;
        try {
            if (!state)
                return d.aoiError.fnError(d, 'custom', { inside: data.inside }, `Invalid Component States Provided`);
            if (!message)
                return d.aoiError.fnError(d, 'custom', { inside: data.inside }, `Invalid Message ID Provided`);

            state = state?.addBrackets()?.toLowerCase();

            switch (state) {
                case 'remove':
                    state = 'remove';
                    break;
                case 'disabled':
                    state = 'disabled';
                    break;
                case 'enabled':
                    state = 'enabled';
                    break;
                default:
                    return d.aoiError.fnError(d, 'custom', { inside: data.inside }, `Invalid State Provided`);
            }

            channel = await d.util.getChannel(d, channel);
            message = await d.util.getMessage(channel, message);

            if (!channel)
                return d.aoiError.fnError(d, 'custom', { inside: data.inside }, `Invalid Channel ID Provided`);
            if (!message)
                return d.aoiError.fnError(d, 'custom', { inside: data.inside }, `Invalid Message ID Provided`);

            if (message.components.length < 1) return d.client.returnCode(d, data);

            if (state === 'remove') {
                await message.edit({ components: [] }).catch(() => {});
            } else {
                message.components.forEach(row => {
                    row.components.forEach(component => {
                        switch (state) {
                            case 'disabled':
                                component.data.disabled = true;
                                break;
                            case 'enabled':
                                component.data.disabled = false;
                                break;
                        }
                    });
                });

                await message
                    .edit({
                        components: message.components
                    })
                    .catch(() => {});
            }
        } catch {}

        return {
            code: d.util.setCode(data)
        };
    }
};
