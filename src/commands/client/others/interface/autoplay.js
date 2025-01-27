module.exports = {
    name: 'autoplay',
    type: 'interaction',
    prototype: 'button',
    $if: 'old',
    code: `
$if[$autoplay==false]
$interactionReply[{newEmbed:{description:$getEmoji[autoplay]  Autoplay mode has been enabled}{color:#4367FE}};;true]
$autoplay[true]
$else
$interactionReply[{newEmbed:{description:$getEmoji[autoplay]  Autoplay mode has been disabled}{color:Red}};;true]
$autoplay[false]
$endif
$onlyIf[$playerStatus!=stopped&&$playerStatus!=destroyed;{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}}{ephemeral}{execute:removeComponents}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{ephemeral}{execute:removeComponents}]
$checkVoice
$checkPerms`
};
