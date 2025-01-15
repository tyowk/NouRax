module.exports = {
    name: 'resume',
    description: 'Resume the currently paused track',
    aliases: 'rs',
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
$elseif[$playerStatus==playing]
$description[$getEmoji[no]  The track already playing!]
$color[Red]
$deleteIn[5s]
$endelseif
$else
$description[$getEmoji[play]  The track has been resumed]
$color[#4367FE]
$resumeTrack
$endif
$checkVoice
$checkPerms`,
};
