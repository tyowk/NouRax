module.exports = [
    {
        name: 'queueEnd',
        channel: '$channelId',
        type: 'queueEnd',
        $if: 'old',
        code: `
$deleteNowPlaying
$if[$playerStatus!=stopped]
$description[ 
Rax leaving the voice channel
Add more songs by using \`/play\`]
$title[$getEmoji[queue]  Queue is over!]
$color[#4367FE]
$deleteIn[20s]
$onlyIf[$hasPermsInChannel[$channelId;$clientId;viewchannel;sendmessages;embedlinks]==true;]
$onlyIf[$channelExists[$channelId]==true;]
$endif
$leavevc
`,
    },
];
