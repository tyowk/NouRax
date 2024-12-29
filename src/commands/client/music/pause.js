module.exports = {
    name: 'pause',
    description: 'Pause the current playing track',
    aliases: 'ps',
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
$elseif[$playerStatus==paused]
$description[$getEmoji[no]  The track already paused!]
$color[Red]
$deleteIn[5s]
$endelseif
$else
$description[$getEmoji[yes]  The track has been paused]
$color[#4367FE]
$pauseTrack
$endif
$checkVoice
$checkPerms`,
};
