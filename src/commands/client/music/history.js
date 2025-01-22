module.exports = {
    name: 'history',
    description: 'Shows the current guild history',
    aliases: 'his',
    params: ['[page]'],
    cooldown: '3s',
    options: [
        {
            name: 'page',
            description: 'History page',
            type: 10,
            required: false
        }
    ],
    $if: 'old',
    code: `
$isInteraction
$if[$historyLength>10]
$componentCollector[$get[ID];$authorId;5m;30s;historyPrevious,historyNext;previousPage,nextPage;{newEmbed:{description:$getEmoji[no]  Nuh uh uh... you can't use this button!}{color:Red}}{interaction}{ephemeral};timeoutComponents;{ "type": "history" }]
$let[ID;$sendMessage[{newEmbed:{title:$nonEscape[$getEmoji[queue]  HISTORY LIST]}{description:>>> $history[$get[PAGE];10;{position}. [{title}]({url}) - <@{requester.id}>]}{color:#4367FE}}{actionRow:{button::2:historyPrevious_$math[$get[PAGE]-1]:$checkCondition[$get[PAGE]<=1]:$getEmoji[previouspage]}{button:$historyLength Songs:2:length:true}{button:$get[PAGE] / $get[MAXPAGE]:2:page:true}{button::2:historyNext_$math[$get[PAGE]+1]:$checkCondition[$get[PAGE]>=$get[MAXPAGE]]:$getEmoji[nextpage]}};true]]
$else
$sendMessage[{newEmbed:{title:$nonEscape[$getEmoji[queue]  HISTORY LIST]}{description:>>> $history[$get[PAGE];10;{position}. [{title}]({url}) - <@{requester.id}>]}{color:#4367FE}}]
$endif
$let[PAGE;$replaceText[$replaceText[$checkCondition[$isNumber[$getContext[page;1]]==true&&$getContext[page;1]<=$get[MAXPAGE]];true;$getContext[page;1]];false;1]]
$let[MAXPAGE;$ceil[$math[$historyLength/10]]]
$interactionDefer
$onlyIf[$historyLength>0;{newEmbed:{description:$getEmoji[no]  The history is empty!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkPerms
`
};
