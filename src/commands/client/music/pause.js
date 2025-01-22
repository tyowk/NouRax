module.exports = {
    name: 'pause',
    description: 'Pause the current playing track',
    cooldown: '3s',
    aliases: 'ps',
    code: `
$isInteraction
$description[$getEmoji[pause]  The track has been paused]
$color[#4367FE]
$pauseTrack
$onlyIf[$playerStatus!=paused;{newEmbed:{description:$getEmoji[no]  The track already paused!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$playerStatus!=stopped&&$playerStatus!=destroyed;{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkVoice
$checkPerms`
};
