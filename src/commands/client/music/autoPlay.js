module.exports = {
    name: 'autoplay',
    description: 'Toggle autoplay of the music player',
    aliases: ['auto', 'ap'],
    cooldown: '3s',
    $if: 'old',
    code: `
$isInteraction
$if[$autoplay==false]
$description[$getEmoji[autoplay]  Autoplay mode has been enabled]
$color[#4367FE]
$autoplay[true]
$endelseif
$else
$description[$getEmoji[autoplay]  Autoplay mode has been disabled]
$color[Red]
$autoplay[false]
$endif
$onlyIf[$playerStatus!=stopped&&$playerStatus!=destroyed;{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkVoice
$checkPerms`
};
