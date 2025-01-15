module.exports = {
    name: 'previous',
    description: 'Play the previous track in the queue',
    aliases: 'prev',
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
$elseif[$isPreviousExists!=true]
$description[$getEmoji[no]  There are no previous track!]
$color[Red]
$deleteIn[5s]
$endelseif
$else
$description[$getEmoji[previous]  Playing the previous track]
$color[#4367FE]
$previousTrack
$endif
$checkVoice
$checkPerms`,
};
