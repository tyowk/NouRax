module.exports = {
    name: 'loop',
    description: 'Change the current loop mode',
    aliases: ['l', 'lm', 'lo'],
    cooldown: '3s',
    $if: 'old',
    code: `
$isInteraction
$if[$loopStatus==off]
$description[$getEmoji[loop]  Set the loop mode to **\`SONG\`**]
$color[#4367FE]
$loopMode[song]
$elseif[$loopStatus==song]
$description[$getEmoji[loop]  Set the loop mode to **\`QUEUE\`**]
$color[#4367FE]
$loopMode[queue]
$endelseif
$else
$description[$getEmoji[loop]  Loop mode has been disabled]
$color[Red]
$loopMode[off]
$endif
$onlyIf[$playerStatus!=stopped&&$playerStatus!=destroyed;{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkVoice
$checkPerms`
};
