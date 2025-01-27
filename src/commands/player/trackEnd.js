module.exports = {
    name: 'trackEnd',
    type: 'trackEnd',
    $if: 'old',
    code: `
$if[$hasPlayer==true&&$voiceId[$clientId]!=||$hasPlayer==true&&$voiceMemberCount[$voiceId[$clientId]]!=1||$hasPlayer==true&&$channelExists[$channelId]==true]
$deleteNowPlaying
$onlyIf[$hasPermsInChannel[$channelId;$clientid;viewchannel]==true;]
$else
$destroyPlayer
$endif
`
};
