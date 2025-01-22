module.exports = {
    name: 'clearqueue',
    description: 'Remove all tracks from the queue',
    aliases: ['clearq', 'cq'],
    cooldown: '3s',
    $if: 'old',
    code: `
$isInteraction
$clearQueue
$if[$queueLength>1]
$description[$getEmoji[remove]  Deleting $queueLength songs from the queue]
$else
$description[$getEmoji[remove]  Remove $queueLength song from the queue]
$endif
$color[#4367FE]
$onlyIf[$playerStatus!=stopped||$playerStatus!=destroyed;{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$queueLength>0;{newEmbed:{description:$getEmoji[no]  The is already empty!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkVoice
$checkPerms`
};
