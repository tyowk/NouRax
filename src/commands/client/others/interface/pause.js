module.exports = {
    name: 'pause',
    type: 'interaction',
    prototype: 'button',
    $if: 'old',
    code: `
$if[$playerStatus==paused]
$interactionReply[{newEmbed:{description:$getEmoji[play]  The track has been resumed}{color:#4367FE}};;true]
$resumeTrack
$else
$interactionReply[{newEmbed:{description:$getEmoji[pause]  The track has been paused}{color:#4367FE}};;true]
$pauseTrack
$endif
$onlyIf[$playerStatus!=stopped&&$playerStatus!=destroyed;{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}}{ephemeral}{execute:removeComponents}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{ephemeral}{execute:removeComponents}]
$checkVoice
$checkPerms`
};
