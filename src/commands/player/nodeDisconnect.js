module.exports = [
    {
        name: 'nodeDisconnect',
        type: 'nodeDisconnect',
        channel: '$getConfig[logs.nodes]',
        code: `
$title[$getEmoji[offline]  |  Lavalink]
$description[**$nodeName** disconnected $if[$errorReason==;;with reason: $errorReason]]
$addTimestamp
$color[Red]`,
    },
];
