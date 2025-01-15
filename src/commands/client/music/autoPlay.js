module.exports = {
    name: 'autoplay',
    description: 'Toggle autoplay of the music player',
    aliases: 'ap',
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
$elseif[$autoplay==false]
$description[$getEmoji[autoplay]  Autoplay mode is enabled]
$color[#4367FE]
$autoplay[true]
$endelseif
$else
$description[$getEmoji[autoplay]  Autoplay mode is disabled]
$color[Red]
$autoplay[false]
$endif
$checkVoice
$checkPerms`,
};
