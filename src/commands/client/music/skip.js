module.exports = {
    name: 'skip',
    description: 'Skip the current playing track',
    aliases: 's',
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
$description[$getEmoji[skip]  Skipped to the next song]
$color[#4367FE]
$skipTrack
$endif
$checkVoice
$checkPerms`,
};
