module.exports = {
    name: '$chunkedText',
    type: 'djs',
    code: d => {
        const data = d.util.aoiFunc(d);
        let [index = 1] = data.inside.splits;
        index = Number(index) - 1;
        if (d.data.chunked && d.data.chunked?.length >= index) {
            data.result = d.data.chunked[index];
        }

        return {
            code: d.util.setCode(data)
        };
    }
};
