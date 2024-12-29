module.exports = {
    name: 'stop',
    description: 'Stop the player and cleared the queue',
    aliases: 'sp',
    $if: 'old',
    code: `
$isInteraction
$if[$playerStatus==stopped]
$description[$getEmoji[no]  The music player already stopped!]
$color[Red]
$deleteIn[5s]
$elseif[$hasPlayer==false]
$description[$getEmoji[no]  There are no players for this guild!]
$color[Red]
$deleteIn[5s]
$endelseif
$else
$description[$getEmoji[yes]  Stopped the player and cleared the queue]
$color[#4367FE]
$stopTrack
$clearQueue
$endif
$checkVoice
$checkPerms`,
};
