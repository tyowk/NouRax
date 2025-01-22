module.exports = {
    name: '$isAuthorOwner',
    type: 'djs',
    code: async d => {
        const data = d.util.aoiFunc(d);

        const owner = d.client.application?.owner
            ? d.client.application?.owner
            : (await d.client.application?.fetch())?.owner;

        if (owner instanceof require('discord.js').Team) {
            data.result = owner?.members?.get(d.author.id) ? true : false;
        } else {
            data.result = owner?.id === d.author.id;
        }

        return {
            code: d.util.setCode(data)
        };
    }
};
