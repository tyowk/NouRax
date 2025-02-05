module.exports = {
    name: 'queue',
    description: 'Shows the current guild queue',
    aliases: ['que', 'q'],
    cooldown: '3s',
    params: ['[page]'],
    options: [
        {
            name: 'page',
            description: 'Queue page',
            type: 10,
            required: false
        }
    ],
    $if: 'old',
    code: `
$isInteraction
$if[$queueLength>10]
$componentCollector[$get[ID];$authorId;5m;30s;queuePrevious,queueNext;previousPage,nextPage;{newEmbed:{description:$getEmoji[no]  Nuh uh uh... you can't use this button!}{color:Red}}{interaction}{ephemeral};timeoutComponents;{ "type": "queue" }]
$let[ID;$sendMessage[{newEmbed:{title:$nonEscape[$getEmoji[queue]  QUEUE LIST]}{description:>>> $queue[$get[PAGE];10;{position}. [{title}]({url}) - <@{requester.id}>]}{color:#4367FE}}{actionRow:{button::2:queuePrevious_$math[$get[PAGE]-1]:$checkCondition[$get[PAGE]<=1]:$getEmoji[previouspage]}{button:$queueLength Songs:2:length:true}{button:$get[PAGE] / $get[MAXPAGE]:2:page:true}{button::2:queueNext_$math[$get[PAGE]+1]:$checkCondition[$get[PAGE]>=$get[MAXPAGE]]:$getEmoji[nextpage]}};true]]
$else
$sendMessage[{newEmbed:{title:$nonEscape[$getEmoji[queue]  QUEUE LIST]}{description:>>> $queue[$get[PAGE];10;{position}. [{title}]({url}) - <@{requester.id}>]}{color:#4367FE}}]
$endif
$let[PAGE;$replaceText[$replaceText[$checkCondition[$isNumber[$getContext[page;1]]==true&&$getContext[page;1]<=$get[MAXPAGE]];true;$getContext[page;1]];false;1]]
$let[MAXPAGE;$ceil[$math[$queueLength/10]]]
$interactionDefer
$onlyIf[$queueLength>0;{newEmbed:{description:$getEmoji[no]  The queue is empty!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkPerms
`
};
