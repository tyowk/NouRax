module.exports = {
    name: 'clearfilter',
    description: 'Clearing all applied filter',
    aliases: ['clear', 'clearfilters'],
    cooldown: '3s',
    code: `
$isInteraction
$description[$getEmoji[sparkles]  Cleared the filter]
$color[#4367FE]
$setFilter[clear]
$onlyIf[$playerStatus!=stopped&&$playerStatus!=destroyed;{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}}{deleteIn:5s}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}]
$checkVoice
$checkPerms`
};
