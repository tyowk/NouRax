module.exports = {
    name: '$replaceEmoji',
    type: 'djs',
    code: d => {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);

        const [type] = data.inside.splits;
        const emojis = d.client.config?.emojis;

        switch (type) {
            case 'spotify':
                data.result = emojis?.spotify;
                break;
            case 'applemusic':
                data.result = emojis?.applemusic;
                break;
            case 'soundcloud':
                data.result = emojis?.soundcloud;
                break;
            case 'deezer':
                data.result = emojis?.deezer;
                break;
            default:
                data.result = emojis?.queue;
        }

        return {
            code: d.util.setCode(data)
        };
    }
};
