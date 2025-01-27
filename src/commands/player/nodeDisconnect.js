module.exports = {
    name: 'nodeDisconnect',
    type: 'nodeDisconnect',
    channel: '$getConfig[logs.status]',
    code: `
$title[$getEmoji[offline]  $eventInfo[name] Disconnected]
$description[Lavalink **$eventInfo[name]** disconnected.]
$color[Red]
$addTimestamp
$onlyIf[$hasPermsInChannel[$channelId;$clientid;viewchannel;sendmessages;embedlinks]==true;]`
};
