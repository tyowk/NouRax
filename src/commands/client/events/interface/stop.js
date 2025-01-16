module.exports = {
    name: 'stop',
    type: 'interaction',
    prototype: 'button',
    $if: 'old',
    code: `
$if[$playerStatus==stopped]
$interactionReply[{newEmbed:{description:$getEmoji[no]  The music player already stopped!}{color:Red}};;true]
$removeComponents[$channelId;$messageId;all]
$elseif[$hasPlayer==false]
$interactionReply[{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}};;true]
$removeComponents[$channelId;$messageId;all]
$endelseif
$else
$stopTrack
$interactionReply[{newEmbed:{description:$getEmoji[stop]  Stopped the player and cleared the queue}{color:#4367FE}};;true]
$endif
$checkVoice
$checkPerms`,
};
