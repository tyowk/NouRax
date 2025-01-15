module.exports = {
    name: 'nodeDestroy',
    type: 'nodeDestroy',
    channel: '$getConfig[logs.status]',
    code: `
$title[$getEmoji[offline]  $eventInfo[name] Destroyed]
$description[Lavalink **$eventInfo[name]** destroyed.
$getEmoji[blank]
$getEmoji[rdot] **Code:**  $eventInfo[code]
$getEmoji[rdot] **Reason:**  $eventInfo[reason]]
$color[Red]
$addTimestamp`
}