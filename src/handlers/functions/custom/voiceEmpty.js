module.exports = {
    name: '$voiceEmpty',
    type: 'djs',
    code: d => {
        const data = d.util.aoiFunc(d);
        const [status] = data.inside.splits;

        const player = d.client.queue?.get(d.guild.id);
        if (status && player) {
            player.voiceEmpty = status == 'true' ? true : false;
        } else {
            data.result = player?.voiceEmpty || false;
        }

        return {
            code: d.util.setCode(data)
        };
    }
};
