module.exports = {
    name: 'disconnect',
    description: 'Disconnect from a voice channel',
    aliases: ['dc', 'leave'],
    $if: 'old',
    code: `
$isInteraction
$if[$hasPlayer==false]
$description[$getEmoji[no]  There are no players for this guild!]
$color[Red]
$deleteIn[5s]
$else
$leavevc
$description[$getEmoji[yes]  Leaving the voice channel <#$voiceId[$clientId]>]
$color[#4367FE]
$endif
$checkVoice
$checkPerms`,
};
