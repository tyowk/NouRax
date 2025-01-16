module.exports = {
    name: '$dm',
    type: 'djs',
    code: async d => {
        const data = d.util.aoiFunc(d);
        const [id = d.author.id] = data.inside.splits;

        let dm = await d.util.getUser(d, id);
        if (!dm) return d.aoiError.fnError(d, 'user', { inside: data.inside });
        d.data.dm = true;

        if (d.data.interaction) return d.client.returnCode(d, data);

        return {
            code: d.util.setCode(data),
            useChannel: dm,
        };
    },
};