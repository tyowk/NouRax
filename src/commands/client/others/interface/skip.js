module.exports = {
    name: 'skip',
    type: 'interaction',
    prototype: 'button',
    code: `
$skipTrack
$interactionReply[{newEmbed:{description:$getEmoji[skip]  Skipped to the next song}{color:#4367FE}};;true]
$onlyIf[$playerStatus!=stopped&&$playerStatus!=destroyed;{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}}{ephemeral}{execute:removeComponents}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{ephemeral}{execute:removeComponents}]
$checkVoice
$checkPerms`
};
