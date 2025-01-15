module.exports = {
    name: '$getConfig',
    type: 'djs',
    code: async d => {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.client.returnCode(d, data);

        const [value] = data.inside.splits;
        const config = d.client.config;

        try {
            let evaled = await eval(`config.${value}`);
            if (typeof evaled === 'object') evaled = JSON.stringify(evaled);
            data.result = evaled;
        } catch {}

        return {
            code: d.util.setCode(data),
        };
    },
};
