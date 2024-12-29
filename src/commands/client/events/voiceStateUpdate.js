module.exports = [
    {
        name: 'voiceStates',
        type: 'voiceStateUpdate',
        $if: 'old',
        code: `
$if[$authorId!=$clientId]
$if[$playerEmpty==true&&$voiceId[$authorId]!=&&$voiceMemberCount[$voiceId[$clientId]]!=1]
$if[$playerStatus==paused]
$playerEmpty[false]
$resumeTrack
$endif
$elseif[$playerEmpty==false&&$voiceId[$authorId]==&&$voiceMemberCount[$voiceId[$clientId]]==1]
$awaitExecute[handleStates]
$if[$playerStatus!=paused]
$playerEmpty[true]
$pauseTrack
$endif
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
$onlyIf[$oldState[mute]==$newState[mute]||$oldState[deaf]==$newState[deaf]&&$isBot==false;]
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
$onlyIf[$hasPermsInChannel[$get[ID];$clientId;sendmessages;embedlinks]==true;]
$onlyIf[$channelExists[$get[ID]]==true;]
$destroyPlayer
$deleteNowPlaying
$let[ID;$playerChannelId]
$onlyif[$hasPlayer==true&&$voiceMemberCount[$voiceId[$clientid]]==1;]
$wait[1m]`,
    },
];
