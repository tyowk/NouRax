module.exports = {
    name: '$chunkedLength',
    type: 'djs',
    code: d => {
        const data = d.util.aoiFunc(d);

        if (d.data.chunked && d.data.chunked?.length) {
            data.result = d.data.chunked?.length;
        } else {
            data.result = 0;
        }

        return {
            code: d.util.setCode(data)
        };
    }
};
