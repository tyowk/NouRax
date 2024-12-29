module.exports = [
    {
        name: 'nodeError',
        type: 'nodeError',
        channel: '$getConfig[logs.nodes]',
        code: `
$title[$getEmoji[offline]  |  Lavalink]
$description[**$nodeName** error $if[$errorReason==;;with reason: $errorReason]]
$addTimestamp
$color[Red]`,
    },
];
