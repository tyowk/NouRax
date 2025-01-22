module.exports = {
    name: 'replay',
    description: 'Replay the current track',
    aliases: 'rp',
    cooldown: '3s',
    $if: 'old',
    code: `
$isInteraction
$description[$getEmoji[replay]  Replaying **[$songInfo[title]]($songInfo[url])**]
$color[#4367FE]
$replayTrack
$if[$playerStatus==paused]
$resumeTrack
$endif
$onlyIf[$isSeekable==true;{newEmbed:{description:$getEmoji[no]  Cannot replay the current track!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$playerStatus!=stopped&&$playerStatus!=destroyed;{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkVoice
$checkPerms`
};
