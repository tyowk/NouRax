module.exports = {
    name: 'unshuffle',
    description: 'Unshuffle the queue',
    aliases: 'unsf',
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
$unshuffleQueue
$description[$getEmoji[shuffle]  Unshuffle the queue]
$color[#4367FE]
$endif
$checkVoice
$checkPerms`,
};
