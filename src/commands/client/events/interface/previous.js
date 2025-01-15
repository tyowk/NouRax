module.exports = {
    name: 'previous',
    type: 'interaction',
    prototype: 'button',
    $if: 'old',
    code: `
$if[$hasPlayer==false]
$interactionReply[{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}};;true]
$elseif[$playerStatus==stopped||$playerStatus==destroyed]
$interactionReply[{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}};;true]
$endelseif
$elseif[$isPreviousExists!=true]
$interactionReply[{newEmbed:{description:$getEmoji[no]  There are no previous track!}{color:Red}};;true]
$endelseif
$else
$previousTrack
$interactionReply[{newEmbed:{description:$getEmoji[previous]  Playing the previous track}{color:#4367FE}};;true]
$endif
$checkVoice
$checkPerms`,
};
