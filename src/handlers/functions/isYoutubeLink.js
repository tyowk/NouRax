module.exports = {
    name: '$isYoutubeLink',
    type: 'djs',
    code: async d => {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);

        let text = data.inside.splits;
        text = text?.join(';')?.addBrackets();

        if (!text) {
            data.result = false;
        } else {
            const regex =
                /^((?:https?:)?\/\/)?((?:www|m|music)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gim;
            data.result = regex.test(text);
        }

        return {
            code: d.util.setCode(data),
        };
    },
};
