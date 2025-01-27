module.exports = {
    name: 'rate',
    description: 'Applies rate filter',
    code: `
$isInteraction
$description[$getEmoji[sparkles]  Rate filter applied]
$color[#4367FE]
$setFilter[rate]
$onlyIf[$playerStatus!=stopped&&$playerStatus!=destroyed;{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}}{deleteIn:5s}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}]
$checkVoice
$checkPerms`
};
