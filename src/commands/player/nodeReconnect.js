module.exports = [
    {
        name: 'nodeReconnect',
        type: 'nodeReconnect',
        channel: '$getConfig[logs.nodes]',
        code: `
$title[$getEmoji[idle]  |  Lavalink]
$description[**$nodeName** Reconnected and ready to rechieve requests!]
$addTimestamp
$color[Yellow]`,
    },
];
