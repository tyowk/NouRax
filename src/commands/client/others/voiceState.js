module.exports = {
    name: 'voiceState',
    type: 'voiceStateUpdate',
    $if: 'old',
    code: `
$if[$authorId!=$clientId]
$if[$voiceEmpty==true&&$voiceId[$authorId]!=&&$voiceId[$clientId]!=]
$voiceEmpty[false]
$resumeTrack
$onlyIf[$voiceMemberCount[$voiceId[$clientId]]!=1&&$playerStatus==paused;]
$elseif[$voiceEmpty==false&&$voiceId[$authorId]==&&$voiceId[$clientId]!=]
$awaitExecute[handleStates]
$if[$playerStatus==playing]
$voiceEmpty[true]
$pauseTrack
$endif
$onlyIf[$voiceMemberCount[$voiceId[$clientId]]==1;]
$endelseif
$endif
$onlyIf[$hasPlayer==true;]
$else
$description[😑  I have been kicked from the voice channel]
$color[Red]
$useChannel[$get[ID]]
$onlyIf[$hasPermsInChannel[$get[ID];$clientId;sendmessages;embedlinks]==true;]
$onlyIf[$channelExists[$get[ID]]==true;]
$destroyPlayer
$deleteNowPlaying
$let[ID;$playerChannelId]
$onlyIf[$voiceId[$clientId]==&&$hasPlayer==true;]
$endif
$onlyIf[$oldState[mute]==$newState[mute]||$oldState[deaf]==$newState[deaf]||$isBot==false;]
$suppressErrors
`
};
