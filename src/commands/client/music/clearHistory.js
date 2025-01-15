module.exports = {
    name: 'clearhistory',
    description: 'Remove all tracks from the history',
    aliases: 'ch',
    $if: 'old',
    code: `
$isInteraction
$if[$hasPlayer==false]
$description[$getEmoji[no]  There are no players for this guild!]
$color[Red]
$deleteIn[5s]
$elseif[$historylength==0]
$description[$getEmoji[no]  The history is already empty!]
$color[Red]
$deleteIn[5s]
$endelseif
$else
$clearHistory
$if[$historyLength>1]
$description[$getEmoji[remove]  Deleting $historyLength songs from the history]
$else
$description[$getEmoji[remove]  Remove $historyLength song from the history]
$endif
$color[#4367FE]
$endif
$checkVoice
$checkPerms`,
};
