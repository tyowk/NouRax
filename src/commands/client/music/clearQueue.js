module.exports = {
    name: 'clearqueue',
    description: 'Remove all tracks from the queue',
    aliases: 'cq',
    $if: 'old',
    code: `
$isInteraction
$if[$hasPlayer==false]
$description[$getEmoji[no]  There are no players for this guild!]
$color[Red]
$deleteIn[5s]
$elseif[$queuelength==0]
$description[$getEmoji[no]  The queue is already empty!]
$color[Red]
$deleteIn[5s]
$endelseif
$else
$clearQueue
$if[$queueLength>1]
$description[$getEmoji[remove]  Deleting $queueLength songs from the queue]
$else
$description[$getEmoji[remove]  Remove $queueLength song from the queue]
$endif
$color[#4367FE]
$endif
$checkVoice
$checkPerms`,
};
