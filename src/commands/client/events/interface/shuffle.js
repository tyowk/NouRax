module.exports = [
    {
        name: 'shuffle',
        type: 'interaction',
        prototype: 'button',
        $if: 'old',
        code: `
$if[$hasPlayer==false]
$interactionReply[{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}};;true]
$elseif[$queueLength==0]
$interactionReply[{newEmbed:{description:$getEmoji[no]  The queue is empty!}{color:Red}};;true]
$endelseif
$else
$interactionReply[{newEmbed:{description:$getEmoji[shuffle]  Please select the shuffle mode}{color:#4367FE}}
{actionRow:{button:Shuffle:primary:shuffle_on:false}{button:Unshuffe:primary:shuffle_off:false}};;true]
$endif
$checkVoice
$checkPerms`,
    },
    {
        name: 'shuffle_on',
        type: 'interaction',
        prototype: 'button',
        $if: 'old',
        code: `
$if[$hasPlayer==false]
$interactionUpdate[{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}};;true]
$elseif[$queueLength==0]
$interactionUpdate[{newEmbed:{description:$getEmoji[no]  The queue is empty!}{color:Red}};;true]
$endelseif
$else
$interactionUpdate[{newEmbed:{description:$getEmoji[shuffle]  Shuffle the queue}{color:#4367FE}};;true]
$shuffleQueue
$endif
`,
    },
    {
        name: 'shuffle_off',
        type: 'interaction',
        prototype: 'button',
        $if: 'old',
        code: `
$if[$hasPlayer==false]
$interactionUpdate[{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}};;true]
$elseif[$queueLength==0]
$interactionUpdate[{newEmbed:{description:$getEmoji[no]  The queue is empty!}{color:Red}};;true]
$endelseif
$else
$interactionUpdate[{newEmbed:{description:$getEmoji[shuffle]  Unshuffe the queue}{color:#4367FE}};;true]
$unshuffleQueue
$endif
`,
    },
];
