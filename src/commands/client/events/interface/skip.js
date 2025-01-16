module.exports = {
    name: 'skip',
    type: 'interaction',
    prototype: 'button',
    $if: 'old',
    code: `
$if[$hasPlayer==false]
$interactionReply[{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}};;true]
$removeComponents[$channelId;$messageId;all]
$elseif[$playerStatus==stopped||$playerStatus==destroyed]
$interactionReply[{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}};;true]
$removeComponents[$channelId;$messageId;all]
$endelseif
$else
$skipTrack
$interactionReply[{newEmbed:{description:$getEmoji[skip]  Skipped to the next song}{color:#4367FE}};;true]
$endif
$checkVoice
$checkPerms`,
};
