module.exports = [
    {
        name: 'nodeConnect',
        type: 'nodeConnect',
        channel: '$getConfig[logs.nodes]',
        code: `
$title[$getEmoji[online]  |  Lavalink]
$description[**$nodeName** connected and ready to rechieve requests!]
$addTimestamp
$color[Green]`,
    },
];
