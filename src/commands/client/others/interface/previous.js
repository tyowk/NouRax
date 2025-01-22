module.exports = {
    name: 'previous',
    type: 'interaction',
    prototype: 'button',
    code: `
$previousTrack
$interactionReply[{newEmbed:{description:$getEmoji[previous]  Playing the previous track}{color:#4367FE}};;true]
$onlyIf[$isPreviousExists==true;{newEmbed:{description:$getEmoji[no]  There are no previousTrack!}{color:Red}}{ephemeral}]
$onlyIf[$playerStatus!=stopped&&$playerStatus!=destroyed;{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}}{ephemeral}{execute:removeComponents}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{ephemeral}{execute:removeComponents}]
$checkVoice
$checkPerms`
};
