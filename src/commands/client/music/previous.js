module.exports = {
    name: 'previous',
    description: 'Play the previous track in the queue',
    aliases: 'prev',
    cooldown: '3s',
    code: `
$isInteraction
$description[$getEmoji[previous]  Playing the previous track]
$color[#4367FE]
$previousTrack
$onlyIf[$isPreviousExists==true;{newEmbed:{description:$getEmoji[no]  There are no previous track!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkVoice
$checkPerms`
};
