module.exports = [
    {
        name: 'voiceStates',
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
$if[$isCurrentExists==true]
$deleteNowPlaying
$endif
$let[ID;$playerChannelId]
$onlyIf[$voiceId[$clientId]==&&$hasPlayer==true;]
$endif
$onlyIf[$oldState[mute]==$newState[mute]||$oldState[deaf]==$newState[deaf]||$isBot==false;]
$suppressErrors
`,
    },
    {
        name: 'handleStates',
        type: 'awaited',
        $if: 'old',
        code: `
$description[The voice channel is empty more than 1 minute
Stopped the player and leaving the voice channel]
$color[Red]
$useChannel[$get[ID]]
$onlyIf[$channelExists[$get[ID]]==true&&$hasPermsInChannel[$get[ID];$clientId;sendmessages;embedlinks]==true;]
$destroyPlayer
$if[$isCurrentExists==true]
$deleteNowPlaying
$endif
$let[ID;$playerChannelId]
$onlyif[$hasPlayer==true&&$voiceMemberCount[$voiceId[$clientid]]==1;]
$onlyIf[$voiceId[$clientId]!=;]
$wait[1m]
$suppressErrors`,
    },
];
