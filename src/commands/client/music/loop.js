module.exports = {
    name: 'loop',
    description: 'Change the current loop mode',
    aliases: ['l', 'lm'],
    $if: 'old',
    code: `
$isInteraction
$if[$hasPlayer==false]
$description[$getEmoji[no]  There are no players for this guild!]
$color[Red]
$deleteIn[5s]
$elseif[$playerStatus==stopped||$playerStatus==destroyed]
$description[$getEmoji[no]  There are no track currently playing!]
$color[Red]
$deleteIn[5s]
$endelseif
$else
$if[$loopStatus==off]
$description[$getEmoji[yes]  Set the loop mode to **\`SONG\`**]
$color[#4367FE]
$loopMode[repeat]
$elseif[$loopStatus==repeat]
$description[$getEmoji[yes]  Set the loop mode to **\`QUEUE\`**]
$color[#4367FE]
$loopMode[queue]
$endelseif
$else
$description[$getEmoji[yes]  Disabled loop mode]
$color[Red]
$loopMode[off]
$endif
$endif
$checkVoice
$checkPerms`,
};
