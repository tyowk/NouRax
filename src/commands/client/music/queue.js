module.exports = [
    {
        name: 'queue',
        description: 'Shows the current guild queue',
        aliases: 'q',
        $if: 'old',
        code: `
$isInteraction
$if[$hasPlayer==false]
$description[$getEmoji[no]  There are no players for this guild!]
$color[Red]
$deleteIn[5s]
$elseif[$queueLength==0]
$description[$getEmoji[no]  The queue is empty!]
$color[Red]
$deleteIn[5s]
$endelseif
$else
$title[QUEUE LIST]
$description[>>> $queue[1;10;{position}. [{title}]({url}) - <@{requester.id}>]]
$color[#4367FE]
$if[$queueLength>10]
$addButton[1;X;danger;delete_$authorId]
$addButton[1;Next;primary;queueNext_2_$authorId]
$addButton[1;$queueLength Songs;primary;length;true]
$addButton[1;Previous;primary;queuePrevious_0_$authorId;true]
$endif
$endif
$checkPerms
`,
    },
    {
        type: 'interaction',
        prototype: 'button',
        $if: 'old',
        code: `
$timeoutComponent
$queueNext
$interactionDeferUpdate
$checkPerms
$onlyIf[$authorId==$splitText[3];$getEmoji[no]  Nuh uh uh... you can't use this button!{intetaction}{ephemeral}]
$onlyIf[$splitText[1]==queueNext;]
$textSplit[$interactionData[customId];_]
`,
    },
    {
        type: 'interaction',
        prototype: 'button',
        $if: 'old',
        code: `
$timeoutComponent
$queuePrevious
$interactionDeferUpdate
$checkPerms
$onlyIf[$authorId==$splitText[3];$getEmoji[no]  Nuh uh uh... you can't use this button!{intetaction}{ephemeral}]
$onlyIf[$splitText[1]==queuePrevious;]
$textSplit[$interactionData[customId];_]
`,
    },
];
