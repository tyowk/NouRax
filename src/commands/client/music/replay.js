module.exports = {
    name: 'replay',
    description: 'Replay the current track',
    aliases: 'rp',
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
$description[$getEmoji[replay]  Replaying **[$songInfo[title]]($songInfo[url])**]
$color[#4367FE]
$replayTrack
$if[$playerStatus==paused]
$resumeTrack
$endif
$endif
$checkVoice
$checkPerms`,
};
