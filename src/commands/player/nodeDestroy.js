module.exports = [
    {
        name: 'nodeDestroy',
        type: 'nodeDestroy',
        channel: '$getConfig[logs.nodes]',
        code: `
$title[$getEmoji[offline]  |  Lavalink]
$description[**$nodeName** destroyed $if[$errorReason==;;with reason: $errorReason]]
$addTimestamp
$color[Red]`,
    },
];
