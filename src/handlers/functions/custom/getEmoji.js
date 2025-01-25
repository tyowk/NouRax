module.exports = {
    name: '$getEmoji',
    type: 'djs',
    code: async d => {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.client.returnCode(d, data);

        let [value] = data.inside.splits;
        value = value?.addBrackets();
        const emojis = d.client.config?.emojis;

        try {
            data.result = await eval(`emojis.${value}`);
        } catch {}

        return {
            code: d.util.setCode(data)
        };
    }
};
