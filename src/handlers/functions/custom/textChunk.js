module.exports = {
    name: '$textChunk',
    type: 'djs',
    code: d => {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);

        let text = data.inside.splits;
        let returnLength = text?.length >= 3 ? (text?.pop() === 'true' ? true : false) : false;
        let chunkSize = text?.length >= 2 ? Number(text?.pop()) : '1024';

        text = text?.join(';')?.addBrackets();

        if (!text) return d.client.returnCode(d, data);

        if (isNaN(chunkSize) || chunkSize < 1) return d.client.returnCode(d, data);

        const textChunks = (text, maxLength = 1024) => {
            maxLength = Number(maxLength);
            const chunks = [];
            let start = 0;

            while (start < text.length) {
                let end = start + maxLength;

                if (end < text.length) {
                    let lastIndex = text.lastIndexOf('\n', end);
                    if (lastIndex === -1 || lastIndex <= start) {
                        lastIndex = end;
                    }
                    end = lastIndex;
                }

                if (end === start) {
                    end = start + maxLength;
                }

                chunks.push(text.slice(start, end).trim());
                start = end;
            }

            return chunks;
        };

        d.data.chunked = textChunks(text, chunkSize);
        if (returnLength) data.result = d.data?.chunked?.length;

        return {
            code: d.util.setCode(data)
        };
    }
};
