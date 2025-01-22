module.exports = {
    name: 'unshuffle',
    description: 'Unshuffle the queue',
    cooldown: '3s',
    aliases: 'unsf',
    code: `
$isInteraction
$unshuffleQueue
$description[$getEmoji[shuffle]  Unshuffle the queue]
$color[#4367FE]
$onlyIf[$queueLength>0;{newEmbed:{description:$getEmoji[no]  The queue is empty!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkVoice
$checkPerms`
};
