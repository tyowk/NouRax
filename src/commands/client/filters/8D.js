module.exports = {
    name: '8d',
    description: 'Applies 8D audio effect',
    aliases: 'eightd',
    cooldown: '3s',
    code: `
$isInteraction
$description[$getEmoji[sparkles]  8D filter applied]
$color[#4367FE]
$setFilter[8d]
$onlyIf[$playerStatus!=stopped&&$playerStatus!=destroyed;{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}}{deleteIn:5s}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}]
$checkVoice
$checkPerms`
};
