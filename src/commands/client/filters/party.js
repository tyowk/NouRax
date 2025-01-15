module.exports = {
    name: 'party',
    description: 'Applies party filter',
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
$description[$getEmoji[sparkles]  Party filter applied
$color[#4367FE]
$setFilter[party]
$endif
$checkVoice
$checkPerms`,
};
