module.exports = {
    name: '$deleteIn',
    type: 'djs',
    code: async d => {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);
        let [deleteIn] = data.inside.splits;

        deleteIn = await d.helpers.time.parse(deleteIn).ms;
        d.data.deleteIn = deleteIn;

        if (d.data.interaction && d.data.interaction?.isChatInputCommand()) return d.client.returnCode(d, data);

        return {
            code: d.util.setCode(data),
            deleteIn
        };
    }
};
