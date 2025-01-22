module.exports = {
    name: 'queueEnd',
    channel: '$channelId',
    type: 'queueEnd',
    $if: 'old',
    code: `
$if[$hasPlayer==true&&$voiceId[$clientId]!=||$hasPlayer==true&&$voiceMemberCount[$voiceId[$clientId]]!=1||$hasPlayer==true&&$channelExists[$channelId]==true]
$description[$getEmoji[sparkles]  Rax has left the voice channel.
Add more songs with **/play** and keep the music flowing!
The party doesn't have to end—bring on your next track!
$getEmoji[blank]]
$image[https://cdn.noujs.my.id/guild/nourax_banner.png]
$color[#4367FE]
$deleteIn[30s]
$onlyIf[$get[STATUS]!=stopped&&$hasPermsInChannel[$channelId;$clientId;viewchannel;sendmessages;embedlinks]==true;]
$leavevc
$deleteNowPlaying
$let[STATUS;$playerStatus]
$else
$destroyPlayer
$endif
`
};
