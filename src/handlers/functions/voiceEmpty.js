module.exports = {
    name: '$voiceEmpty',
    type: 'djs',
    code: d => {
        const data = d.util.aoiFunc(d);
        const [status] = data.inside.splits;

        const player = d.client.queue?.get(d.guild.id);
        if (status && player) {
            player.emptyPlayer = status == 'true' ? true : false;
        } else {
            data.result = player?.emptyPlayer || false;
        }

        return {
            code: d.util.setCode(data),
        };
    },
};