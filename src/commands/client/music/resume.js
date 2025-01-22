module.exports = {
    name: 'resume',
    description: 'Resume the currently paused track',
    aliases: ['continue', 'rs'],
    cooldown: '3s',
    code: `
$isInteraction
$description[$getEmoji[play]  The track has been resumed]
$color[#4367FE]
$resumeTrack
$onlyIf[$playerStatus!=playing;{newEmbed:{description:$getEmoji[no]  The track already playing!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$playerStatus!=stopped&&$playerStatus!=destroyed;{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkVoice
$checkPerms`
};
