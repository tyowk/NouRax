module.exports = {
    name: '$flags',
    type: 'djs',
    code: async d => {
        const data = d.util.aoiFunc(d);
        let [flags] = data.inside.splits;

        try {
            flags = Number(await eval(flags));
            d.data.flags = flags;
        } catch {}

        return {
            code: d.util.setCode(data),
            flags
        };
    }
};
