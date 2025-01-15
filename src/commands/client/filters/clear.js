module.exports = {
    name: 'clear',
    description: 'Clearing all applied filter',
    aliases: 'reset',
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
$description[$getEmoji[sparkles]  Cleared the filter]
$color[#4367FE]
$setFilter[clear]
$endif
$checkVoice
$checkPerms`,
};
