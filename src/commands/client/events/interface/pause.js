module.exports = {
    name: 'pause',
    type: 'interaction',
    prototype: 'button',
    $if: 'old',
    code: `
$if[$hasPlayer==false]
$interactionReply[{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}};;true]
$elseif[$playerStatus==stopped||$playerStatus==destroyed]
$interactionReply[{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}};;true]
$endelseif
$elseif[$playerStatus==paused]
$interactionReply[{newEmbed:{description:$getEmoji[play]  The track has been resumed}{color:#4367FE}};;true]
$resumeTrack
$endelseif
$else
$interactionReply[{newEmbed:{description:$getEmoji[pause]  The track has been paused}{color:#4367FE}};;true]
$pauseTrack
$endif
$checkVoice
$checkPerms`,
};
