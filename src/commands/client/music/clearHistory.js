module.exports = {
    name: 'clearhistory',
    description: 'Remove all tracks from the history',
    aliases: ['clearh', 'ch'],
    cooldown: '3s',
    $if: 'old',
    code: `
$isInteraction
$clearHistory
$if[$historyLength>1]
$description[$getEmoji[remove]  Deleting $historyLength songs from the history]
$else
$description[$getEmoji[remove]  Remove $historyLength song from the history]
$endif
$color[#4367FE]
$onlyIf[$historyLength>0;{newEmbed:{description:$getEmoji[no]  The history is already empty!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkVoice
$checkPerms`
};
