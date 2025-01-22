module.exports = {
    name: 'replay',
    type: 'interaction',
    prototype: 'button',
    $if: 'old',
    code: `
$interactionReply[{newEmbed:{description:$nonEscape[$getEmoji[replay]  Replaying **[$songInfo[title]]($songInfo[url])**]}{color:#4367FE}};;true]
$replayTrack
$if[$playerStatus==paused]
$resumeTrack
$endif
$onlyIf[$playerStatus!=stopped&&$playerStatus!=destroyed;{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}}{ephemeral}{execute:removeComponents}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{ephemeral}{execute:removeComponents}]
$checkVoice
$checkPerms`
};
