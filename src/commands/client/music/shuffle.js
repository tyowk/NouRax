module.exports = {
    name: 'shuffle',
    description: 'Shuffle the queue',
    aliases: 'sf',
    $if: 'old',
    code: `
$isInteraction
$if[$hasPlayer==false]
$description[$getEmoji[no]  There are no players for this guild!]
$color[Red]
$deleteIn[5s]
$elseif[$queuelength==0]
$description[$getEmoji[no]  The queue is empty!]
$color[Red]
$deleteIn[5s]
$endelseif
$else
$shuffleQueue
$description[$getEmoji[shuffle]  Shuffle the queue]
$color[#4367FE]
$endif
$checkVoice
$checkPerms`,
};
