module.exports = [
    {
        name: '$getEmoji',
        type: 'djs',
        code: async d => {
            const data = d.util.aoiFunc(d);
            if (data.err) return d.client.returnCode(d, data);

            const [value] = data.inside.splits;
            const config = d.client.config?.emojis;

            try {
                let evaled = await eval(`config.${value}`);
                data.result = evaled;
            } catch {}

            return {
                code: d.util.setCode(data),
            };
        },
    },
    {
        name: '$checkPermsPlayer',
        type: 'aoi.js',
        params: [],
        code: `
$if[$hasPlayer==true]
$onlyIf[$maxQueueSize>=$queueLength;{newEmbed:{description:$nonEscape[$getEmoji[no]]  Maximum queue size reaches $maxQueueSize!}{color:Red}}{deleteIn:5s}{ephemeral}]
$endif
$onlyIf[$message!=;{newEmbed:{description:$nonEscape[$getEmoji[no]]  Nu uh uh... please provide a valid url or song title!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPermsInChannel[$voiceId;$clientid;speak]==true;{newEmbed:{description:$nonEscape[$getEmoji[no]]  Umm, this is awkward. I don't have \`Speak\` permission!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPermsInChannel[$voiceId;$clientid;connect]==true;{newEmbed:{description:$nonEscape[$getEmoji[no]]  Umm, this is awkward. I don't have \`Connect\` permission!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$voiceId[$authorId]!=;{newEmbed:{description:$nonEscape[$getEmoji[no]]  You need to connect to a voice channel!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPermsInChannel[$channelId;$clientid;embedlinks]==true;$nonEscape[$getEmoji[no]]  Umm, this is awkward. I don't have \`EmbedLinks\` permission!{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPermsInChannel[$channelId;$clientid;viewchannel;sendmessages]==true;]`,
    },
    {
        name: '$checkPerms',
        type: 'aoi.js',
        params: [],
        code: `
$onlyIf[$hasPermsInChannel[$channelId;$clientid;embedlinks]==true;$nonEscape[$getEmoji[no]]  Umm, this is awkward. I don't have \`EmbedLinks\` permission!{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPermsInChannel[$channelId;$clientid;viewchannel;sendmessages]==true;]`,
    },
    {
        name: '$checkVoice',
        type: 'aoi.js',
        params: [],
        code: `
$if[$hasPlayer==true]
$onlyIf[$voiceId[$clientId]==$voiceId[$authorId];{newEmbed:{description:$nonEscape[$getEmoji[no]]  You are not in the same voice channel!}{color:Red}}{deleteIn:5s}{ephemeral}]
$endif
$onlyIf[$voiceId[$authorId]!=;{newEmbed:{description:$nonEscape[$getEmoji[no]]  You need to connect to a voice channel!}{color:Red}}{deleteIn:5s}{ephemeral}]`,
    },
    {
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
    },
    {
        name: '$checkClientOwnerIds',
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
                code: d.util.setCode(data),
            };
        },
    },
    {
        name: '$isInteraction',
        type: 'djs',
        code: async d => {
            const data = d.util.aoiFunc(d);
            let content = data.inside.splits;

            let send = {
                embeds: d.embeds,
                files: d.files,
                components: d.components,
            };

            if (!d.data.interaction) return d.client.returnCode(d, data);
            if (content && content?.length) send.content = content?.join(';')?.addBrackets();
            if (d.data.dm === true) {
                await d.data.interaction?.member?.send(send).catch(() => {});
                send = {
                    embeds: [
                        {
                            description: `Please check your DM's!`,
                            color: 0x4367fe,
                        },
                    ],
                };
            }

            const msg = await d.data.interaction?.editReply(send).catch(() => {});
            if (d.data.deleteIn) setTimeout(() => msg?.delete()?.catch(() => {}), d.data.deleteIn);
            return {
                code: d.util.setCode(data),
            };
        },
    },
    {
        name: '$getContext',
        type: 'djs',
        code: d => {
            const data = d.util.aoiFunc(d);
            if (data.err) return d.client.returnCode(d, data);
            const [option, msg = 'all'] = data.inside.splits;

            const extractUrl = str => {
                const matched = str.match(/<(https?:\/\/[^>]+)>/);
                return matched ? matched[1] : null;
            };

            if (d.data.interaction) {
                if (option == 'false') return d.client.returnCode(d, data);
                data.result = d.data.interaction.options.get(option.addBrackets())?.value;
            } else {
                if (msg == 'false') return d.client.returnCode(d, data);
                data.result = msg === 'all' ? d.args.join(' ') : d.args[Number(msg) - 1];
            }

            if (typeof data.result === 'string') {
                const url = extractUrl(data.result);
                if (url) {
                    data.result = url;
                }
            }

            return {
                code: d.util.setCode(data),
            };
        },
    },
    {
        name: '$onlyIf',
        type: 'djs',
        code: async d => {
            const data = d.util.aoiFunc(d);
            if (data.err) return d.error(data.err);
            let error = false;

            let [condition, err = ''] = data.inside.splits;

            if (!eval(d.helpers.checkCondition.solve(d.helpers.mustEscape(condition)))) {
                error = true;
                if (err?.trim() === '') {
                } else {
                    if (!err.includes('{interaction}') && d.data.interaction) err = err + '{interaction}';
                    if (
                        (d.data.interaction && d.data.interaction?.isChatInputCommand()) ||
                        d.data.interaction?.deferred
                    ) {
                        d.data.interaction.reply = d.data.interaction?.editReply?.bind(d.data.interaction);
                    }
                    const errorMsg = await d.util.errorParser(err, d);
                    d.aoiError.makeMessageError(d.client, d.channel, errorMsg.data ?? errorMsg, errorMsg.options, d);
                }
            }

            return {
                code: d.util.setCode(data),
                error,
            };
        },
    },
    {
        name: '$deleteIn',
        type: 'djs',
        code: async d => {
            const data = d.util.aoiFunc(d);
            if (data.err) return d.client.returnCode(d, data);
            let [deleteIn] = data.inside.splits;

            deleteIn = await d.helpers.time.parse(deleteIn).ms;
            d.data.deleteIn = deleteIn;

            if (d.data.interaction) return d.client.returnCode(d, data);

            return {
                code: d.util.setCode(data),
                deleteIn,
            };
        },
    },
    {
        name: '$dm',
        type: 'djs',
        code: async d => {
            const data = d.util.aoiFunc(d);
            const [id = d.author.id] = data.inside.splits;

            let dm = await d.util.getUser(d, id);
            if (!dm) return d.aoiError.fnError(d, 'user', { inside: data.inside });
            d.data.dm = true;

            if (d.data.interaction) return d.client.returnCode(d, data);

            return {
                code: d.util.setCode(data),
                useChannel: dm,
            };
        },
    },
    {
        name: '$queueNext',
        type: 'djs',
        code: async d => {
            const data = d.util.aoiFunc(d);
            try {
                const player = d.client.queue.get(d.guild.id);
                if (!player || !player?.queue?.length || player?.queue?.length / 10 <= 1) {
                    d.message.edit({ components: [] });
                    return d.client.returnCode(d, data);
                }

                let components = d.message.components[0].components;
                let embeds = d.message.embeds[0];
                if (player?.queue?.length / 10 <= components[2].data.custom_id.split('_')[1]) {
                    components[2].data.disabled = true;
                }

                const interpreted = (
                    await d.interpreter(
                        d.client,
                        d.data.interaction,
                        [],
                        {
                            code: `$nonEscape[$queue[${components[2].data.custom_id.split('_')[1]};10;{position}. [{title}]({url}) - {requester.mention}]]`,
                            name: 'NameParser',
                        },
                        undefined,
                        true,
                    )
                )?.code;

                components[1].data.label = `${player?.queue?.length} Songs`;
                components[0].data.disabled = false;
                components[2].data.custom_id =
                    'queueNext_' +
                    (Number(components[2].data.custom_id.split('_')[1]) + 1) +
                    `_${d.data.interaction?.author?.id}`;
                components[0].data.custom_id =
                    'queuePrevious_' +
                    (Number(components[0].data.custom_id.split('_')[1]) + 1) +
                    `_${d.data.interaction?.author?.id}`;
                embeds.data.description = `>>> ${interpreted}`;
                d.message.edit({
                    components: d.message.components,
                    embeds: d.message.embeds,
                });
            } catch (err) {
                d.message.edit({
                    components: [],
                    embeds: [
                        {
                            description: 'An error occurred: ' + err.message,
                            color: 0xff0000,
                        },
                    ],
                });
            }

            return {
                code: d.util.setCode(data),
            };
        },
    },
    {
        name: '$queuePrevious',
        type: 'djs',
        code: async d => {
            const data = d.util.aoiFunc(d);
            try {
                const player = d.client.queue.get(d.guild.id);
                if (!player || !player?.queue?.length || player?.queue?.length / 10 <= 1) {
                    d.message.edit({ components: [] });
                    return d.client.returnCode(d, data);
                }

                let components = d.message.components[0].components;
                let embeds = d.message.embeds[0];
                if (Number(components[0].data.custom_id.split('_')[1]) <= 1) {
                    components[0].data.disabled = true;
                }

                const interpreted = (
                    await d.interpreter(
                        d.client,
                        d.data.interaction,
                        [],
                        {
                            code: `$nonEscape[$queue[${components[0].data.custom_id.split('_')[1]};10;{position}. [{title}]({url}) - {requester.mention}]]`,
                            name: 'NameParser',
                        },
                        undefined,
                        true,
                    )
                )?.code;

                components[1].data.label = `${player?.queue?.length} Songs`;
                components[2].data.disabled = false;
                components[0].data.custom_id =
                    'queuePrevious_' +
                    (Number(components[0].data.custom_id.split('_')[1]) - 1) +
                    `_${d.data.interaction?.author?.id}`;
                components[2].data.custom_id =
                    'queueNext_' +
                    (Number(components[2].data.custom_id.split('_')[1]) - 1) +
                    `_${d.data.interaction?.author?.id}`;
                embeds.data.description = `>>> ${interpreted}`;
                await d.message.edit({
                    components: d.message.components,
                    embeds: d.message.embeds,
                });
            } catch (err) {
                d.message.edit({
                    components: [],
                    embeds: [
                        {
                            description: 'An error occurred: ' + err.message,
                            color: 0xff0000,
                        },
                    ],
                });
            }

            return {
                code: d.util.setCode(data),
            };
        },
    },
    {
        name: '$thumbnail',
        type: 'djs',
        code: async d => {
            const data = d.util.aoiFunc(d);
            if (data.err) return d.error(data.err);

            let fields = data.inside.splits;
            let i = 0;

            if (isNaN(fields[0]) || fields[0] < 1 || fields[0] > 10) i = -1;

            const index = Number(fields[i] ?? 1) - 1;
            const url = fields[i + 1].addBrackets();

            if (!d.embeds[index]) d.embeds[index] = new d.embed();

            if (!url) return d.client.returnCode(d, data);
            d.embeds[index].setThumbnail(url);

            return {
                code: d.util.setCode(data),
                embeds: d.embeds,
            };
        },
    },
    {
        name: '$image',
        type: 'djs',
        code: async d => {
            const data = d.util.aoiFunc(d);
            if (data.err) return d.error(data.err);

            let fields = data.inside.splits;
            let i = 0;

            if (isNaN(fields[0]) || fields[0] < 1 || fields[0] > 10) i = -1;

            const index = Number(fields[i] ?? 1) - 1;
            const url = fields[i + 1].addBrackets();

            if (!d.embeds[index]) d.embeds[index] = new d.embed();

            if (!url) return d.client.returnCode(d, data);
            d.embeds[index].setImage(url);

            return {
                code: d.util.setCode(data),
                embeds: d.embeds,
            };
        },
    },
    {
        name: '$footer',
        type: 'djs',
        code: async d => {
            const data = d.util.aoiFunc(d);
            if (data.err) return d.error(data.err);

            let fields = data.inside.splits;
            let i = 0;

            if (isNaN(fields[0]) || fields[0] < 1 || fields[0] > 10) i = -1;

            const index = Number(fields[i] ?? 1) - 1;
            const text = fields[i + 1].addBrackets();
            const iconURL = fields[i + 2]?.addBrackets();

            if (!d.embeds[index]) d.embeds[index] = new d.embed();

            if (iconURL) {
                d.embeds[index].setFooter({
                    text,
                    iconURL,
                });
            } else {
                d.embeds[index].setFooter({
                    text,
                });
            }

            return {
                code: d.util.setCode(data),
                embeds: d.embeds,
            };
        },
    },
    {
        name: '$replaceNowPlaying',
        type: 'djs',
        code: d => {
            const data = d.util.aoiFunc(d);
            const [type] = data.inside.splits;
            const emojis = d.client.config?.emojis;

            switch (type) {
                case 'spotify':
                    data.result = emojis?.spotify;
                    break;
                case 'applemusic':
                    data.result = emojis?.applemusic;
                    break;
                case 'soundcloud':
                    data.result = emojis?.soundcloud;
                    break;
                case 'deezer':
                    data.result = emojis?.deezer;
                    break;
                default:
                    data.result = emojis?.queue;
            }

            return {
                code: d.util.setCode(data),
            };
        },
    },
    {
        name: '$playerEmpty',
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
    },
    {
        name: '$lyrics',
        type: 'djs',
        code: async d => {
            const data = d.util.aoiFunc(d);
            if (data.err) return d.error(data.err);
            const title = data.inside.splits;
            if (!title?.length) return d.client.returnCode(d, data);

            data.result = await d.client.lyrics?.songs?.search(title?.join(';')).then(x => x[0]?.lyrics());
            return {
                code: d.util.setCode(data),
            };
        },
    },
    {
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
                code: d.util.setCode(data),
            };
        },
    },
    {
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
                code: d.util.setCode(data),
            };
        },
    },
    {
        name: '$textChunk',
        type: 'djs',
        code: d => {
            const data = d.util.aoiFunc(d);
            if (data.err) return d.client.returnCode(d, data);

            let text = data.inside.splits;
            let chunkSize = Number(text.pop());
            text = text?.join(';')?.addBrackets();

            if (!text) return d.client.returnCode(d, data);

            if (isNaN(chunkSize) || chunkSize < 1) return d.client.returnCode(d, data);

            d.data.chunked = textChunks(text, chunkSize);

            return {
                code: d.util.setCode(data),
            };
        },
    },
    {
        name: '$timeoutComponent',
        type: 'djs',
        code: async d => {
            const data = d.util.aoiFunc(d);
            if (!d.data.interaction && !d.data.interaction.isButton()) return d.client.returnCode(d, data);

            const key = d.data.interaction?.message?.id;
            if (!key) return d.client.returnCode(d, data);
            const timeout = d.client.timeout.get(key);
            if (timeout) clearTimeout(timeout);
            const x = setTimeout(async () => {
                d.client.timeout.delete(key);
                await d.data.interaction?.message
                    ?.edit({
                        components: [],
                    })
                    .catch(() => {});
            }, 20000);
            d.client.timeout.set(key, x);
            return {
                code: d.util.setCode(data),
            };
        },
    },
    {
        name: '$channelExists',
        type: 'djs',
        code: async d => {
            const data = d.util.aoiFunc(d);
            if (data.err) return d.error(data.err);

            let [channel] = data.inside.splits;

            channel = d.client.channels.cache.find(
                x => x.name?.toLowerCase() === channel?.toLowerCase()?.addBrackets() || x?.id === channel,
            );

            data.result = !!channel;

            return {
                code: d.util.setCode(data),
            };
        },
    },
];

function textChunks(text, maxLength = 1024) {
    maxLength = Number(maxLength);
    const chunks = [];
    let start = 0;

    while (start < text.length) {
        let end = start + maxLength;
        if (end < text.length) {
            while (end > start && text[end] !== ' ' && text[end] !== '\n') {
                end--;
            }
            if (end === start) {
                end = start + maxLength;
            }
        }
        chunks.push(text.slice(start, end).trim());
        start = end;
    }

    return chunks;
}
