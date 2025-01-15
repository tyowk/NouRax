module.exports = {
    name: 'nodeConnect',
    type: 'nodeConnect',
    channel: '$getConfig[logs.status]',
    code: `
$title[$getEmoji[online]  $eventInfo[name] Connected]
$description[Lavalink **$eventInfo[name]** is ready to accept connections.]
$color[Green]
$addTimestamp`
}