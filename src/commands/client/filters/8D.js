module.exports = {
    name: '8d',
    description: 'Applies 8D audio effect',
    aliases: 'eightd',
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
$description[$getEmoji[yes]  8D filter applied]
$color[#4367FE]
$setFilter[8d]
$endif
$checkVoice
$checkPerms`,
};
