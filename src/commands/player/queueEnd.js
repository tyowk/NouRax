module.exports = [
    {
        name: 'queueEnd',
        channel: '$channelId',
        type: 'queueEnd',
        $if: 'old',
        code: `
$if[$hasPlayer==true&&$voiceId[$clientId]!=||$hasPlayer==true&&$voiceMemberCount[$voiceId[$clientId]]!=1||$hasPlayer==true&&$channelExists[$channelId]==true]
$deleteNowPlaying
$if[$playerStatus!=stopped]
$description[ 
Rax leaving the voice channel
Add more songs by using \`/play\`]
$title[$getEmoji[queue]  Queue is over!]
$color[#4367FE]
$deleteIn[20s]
$onlyIf[$hasPermsInChannel[$channelId;$clientId;viewchannel;sendmessages;embedlinks]==true;]
$endif
$leavevc
$else
$destroyPlayer
$endif
`,
    },
];
