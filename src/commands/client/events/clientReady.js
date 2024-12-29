module.exports = [
    {
        name: 'clientReady',
        type: 'ready',
        channel: '$getConfig[logs.ready]',
        code: `
$title[$getEmoji[online]  |  Client]
$description[**NouRax** is now online and fully operational]
$addTimestamp
$color[Green]
$sendMessage[{newEmbed:{description:$nonEscape[<:idle:1318498782731698197>]  **Connecting...**}{color:Yellow}}]`,
    },
];
