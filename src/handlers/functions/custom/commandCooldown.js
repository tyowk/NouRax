const { Group } = require('@aoijs/aoi.structures');

module.exports = {
    name: '$commandCooldown',
    type: 'djs',
    code: async d => {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);
        let [error = '', time, userId = d.author?.id] = data.inside.splits;

        if (!(d.client.cooldowns instanceof Group)) d.client.cooldowns = new Group();
        const cooldowns = d.client.cooldowns;
        const cmd = d.client.cmd.default.find(x => x?.name?.toLowerCase() === d.command.name);

        if (!cmd || !cmd.cooldown) return d.client.returnCode(d, data);
        time = time ? d.helpers.time.parse(time).ms : d.helpers.time.parse(cmd.cooldown).ms;

        time = checkCooldown(d.client, userId, cmd.name, time);

        if (time && time > 1000) {
            if (error?.trim() === '') return d.client.returnCode(d, data);
            if (!error.includes('{interaction}') && d.data.interaction) error += '{interaction}';
            error = error
                .replaceAll('%time%', d.helpers.time.format(time.toFixed()).humanize())
                .replaceAll('%timestamp%', `<t:${((time + Date.now()) / 1000).toFixed()}:R>`);

            if (d.data.interaction && d.data.interaction?.deferred) {
                d.data.interaction.reply = d.data.interaction?.editReply?.bind(d.data.interaction);
            }

            error = await d.util.errorParser(error, d);
            d.aoiError.makeMessageError(d.client, d.channel, error.data || error, error.options, d);
        }

        return {
            code: d.util.setCode(data),
            error: time ? true : false
        };
    }
};

function checkCooldown(client, userId, command, cooldownTime) {
    if (!client || !command || !userId || !cooldownTime) return;
    const now = Date.now();
    const key = `${userId}:${command}`;

    if (client.cooldowns.has(key)) {
        const expirationTime = client.cooldowns.get(key);
        const timeLeft = expirationTime - now;
        if (timeLeft > 0) return timeLeft;
    }

    client.cooldowns.set(key, now + cooldownTime);
    setTimeout(() => client.cooldowns.delete(key), cooldownTime);
    return;
}
