module.exports = [
    {
        name: 'loop',
        type: 'interaction',
        prototype: 'button',
        $if: 'old',
        code: `
$if[$hasPlayer==false]
$interactionReply[{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}};;true]
$elseif[$playerStatus==stopped||$playerStatus==destroyed]
$interactionReply[{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}};;true]
$endelseif
$else
$interactionReply[{newEmbed:{description:$getEmoji[loop]  Please select the loop mode}{color:#4367FE}}
{actionRow:{button:SONG:primary:loop_song:$checkCondition[$loopStatus==song]}{button:QUEUE:primary:loop_queue:$checkCondition[$loopStatus==queue]}{button:OFF:danger:loop_disable:$checkCondition[$loopStatus==off]}};;true]
$endif
$checkVoice
$checkPerms`,
    },
    {
        name: 'loop_song',
        type: 'interaction',
        prototype: 'button',
        $if: 'old',
        code: `
$if[$hasPlayer==false]
$interactionUpdate[{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}};;true]
$elseif[$playerStatus==stopped||$playerStatus==destroyed]
$interactionUpdate[{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}};;true]
$endelseif
$else
$interactionUpdate[{newEmbed:{description:$getEmoji[loop]  Set the loop mode to **\`SONG\`**}{color:#4367FE}}
{actionRow:{button:SONG:primary:loop_song:$checkCondition[$loopStatus==song]}{button:QUEUE:primary:loop_queue:$checkCondition[$loopStatus==queue]}{button:OFF:danger:loop_disable:$checkCondition[$loopStatus==off]}};;true]
$loopMode[song]
$endif
`,
    },
    {
        name: 'loop_queue',
        type: 'interaction',
        prototype: 'button',
        $if: 'old',
        code: `
$if[$hasPlayer==false]
$interactionUpdate[{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}};;true]
$elseif[$playerStatus==stopped||$playerStatus==destroyed]
$interactionUpdate[{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}};;true]
$endelseif
$else
$interactionUpdate[{newEmbed:{description:$getEmoji[loop]  Set the loop mode to **\`QUEUE\`**}{color:#4367FE}}
{actionRow:{button:SONG:primary:loop_song:$checkCondition[$loopStatus==song]}{button:QUEUE:primary:loop_queue:$checkCondition[$loopStatus==queue]}{button:OFF:danger:loop_disable:$checkCondition[$loopStatus==off]}};;true]
$loopMode[queue]
$endif
`,
    },
    {
        name: 'loop_disable',
        type: 'interaction',
        prototype: 'button',
        $if: 'old',
        code: `
$if[$hasPlayer==false]
$interactionUpdate[{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}};;true]
$elseif[$playerStatus==stopped||$playerStatus==destroyed]
$interactionUpdate[{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}};;true]
$endelseif
$else
$interactionUpdate[{newEmbed:{description:$getEmoji[loop]  Loop mode has been disabled}{color:Red}}
{actionRow:{button:SONG:primary:loop_song:$checkCondition[$loopStatus==song]}{button:QUEUE:primary:loop_queue:$checkCondition[$loopStatus==queue]}{button:OFF:danger:loop_disable:$checkCondition[$loopStatus==off]}};;true]
$loopMode[off]
$endif
`,
    },
];
