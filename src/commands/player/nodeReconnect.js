module.exports = {
    name: 'nodeReconnect',
    type: 'nodeReconnect',
    channel: '$getConfig[logs.status]',
    code: `
$title[$getEmoji[idle]  $eventInfo[name] Reconnecting]
$description[Lavalink **$eventInfo[name]** is reconnecting.
$getEmoji[blank]
$getEmoji[rdot] **Interval:**  $eventInfo[interval]
$getEmoji[rdot] **Left:**  $eventInfo[left]]
$color[Yellow]
$addTimestamp`
}