module.exports = {
    name: 'china',
    description: 'Applies china filter',
    cooldown: '3s',
    code: `
$isInteraction
$description[$getEmoji[sparkles]  China filter applied]
$color[#4367FE]
$setFilter[china]
$onlyIf[$playerStatus!=stopped&&$playerStatus!=destroyed;{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}}{deleteIn:5s}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}]
$checkVoice
$checkPerms`
};
