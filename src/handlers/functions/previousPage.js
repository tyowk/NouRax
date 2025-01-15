module.exports = {
    name: '$previousPage',
    type: 'djs',
    code: async d => {
        const data = d.util.aoiFunc(d);
        const [type] = data.inside.splits;
        if (!['history', 'queue', 'lyrics'].includes(type)) return d.client.returnCode(d, data);

        try {
            const player = type !== 'lyrics' ? d.client.queue.get(d.guild.id) : { lyrics: d.data.chunked };
            if (!player || !player[type]?.length || player[type]?.length / (type !== 'lyrics' ? 10 : 1) <= 1) {
                if (d.data?.interaction?.deferred) {
                    d.data?.interaction?.editReply({ components: [] });
                } else {
                    d.data?.interaction?.update({ components: [] });
                }

                return d.client.returnCode(d, data);
            }

            let components = d.message.components[0].components;
            let embeds = d.message.embeds[0];
            const currentPage = Number(components[0].data.custom_id.split('_')[1]);

            if (currentPage <= 1) {
                components[0].data.disabled = true;
            }

            const interpreted =
                type !== 'lyrics'
                    ? (
                          await d.interpreter(
                              d.client,
                              d.data.interaction,
                              [],
                              {
                                  code:
                                      type !== 'lyrics'
                                          ? `$nonEscape[$${type}[${currentPage};10;{position}. [{title}]({url}) - {requester.mention}]]`
                                          : `$nonEscape[$chunkedText[${currentPage}]]`,
                                  name: 'NameParser',
                              },
                              undefined,
                              true,
                          )
                      )?.code
                    : `${player[type]?.[currentPage - 1] || 'unknown'}`;

            components[1].data.label = type !== 'lyrics' ? `${player[type]?.length} Songs` : 'Lyrics';
            components[2].data.label = `${currentPage} / ${Math.ceil(player[type]?.length / (type !== 'lyrics' ? 10 : 1) || 1)}`;
            components[3].data.disabled = false;
            components[0].data.custom_id = `${type}Previous_${currentPage - 1}_${d.data.interaction?.author?.id}`;
            components[3].data.custom_id = `${type}Next_${currentPage + 1}_${d.data.interaction?.author?.id}`;
            embeds.data.description = `>>> ${interpreted}`;

            if (d.data?.interaction?.deferred) {
                await d.data?.interaction?.editReply({
                    components: d.message.components,
                    embeds: d.message.embeds,
                });
            } else {
                await d.data?.interaction?.update({
                    components: d.message.components,
                    embeds: d.message.embeds,
                });
            }
        } catch (err) {
            console.error(err);
            if (d.data?.interaction?.deferred) {
                d.data?.interaction?.editReply({
                    components: [],
                    embeds: [
                        {
                            title: 'An error occurred',
                            description: `\`\`\`js\n${err.message || 'null'}\`\`\``,
                            color: 0xff0000,
                        },
                    ],
                });
            } else {
                d.data?.interaction?.update({
                    components: [],
                    embeds: [
                        {
                            title: 'An error occurred',
                            description: `\`\`\`js\n${err.message || 'null'}\`\`\``,
                            color: 0xff0000,
                        },
                    ],
                });
            }
        }

        return {
            code: d.util.setCode(data),
        };
    },
};
