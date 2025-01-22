module.exports = {
    name: 'nodeError',
    type: 'nodeError',
    channel: '$getConfig[logs.status]',
    code: `
$title[$getEmoji[offline]  $eventInfo[name] Error]
$description[Lavalink **$eventInfo[name]** error: $eventInfo[error]]
$color[Red]
$addTimestamp
$onlyIf[$hasPermsInChannel[$channelId;$clientid;viewchannel;sendmessages;embedlinks]==true;]`
};
