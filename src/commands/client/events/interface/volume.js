module.exports = [
    {
        name: 'volumeup',
        type: 'interaction',
        prototype: 'button',
        $if: 'old',
        code: `
$if[$hasPlayer==false]
$interactionReply[{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}};;true]
$removeComponents[$channelId;$messageId;all]
$elseif[$playerStatus==stopped||$playerStatus==destroyed]
$interactionReply[{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}};;true]
$removeComponents[$channelId;$messageId;all]
$endelseif
$else
$interactionReply[{newEmbed:{description:$getEmoji[volumeup]  Set the current track volume to \`$volume%\`}{color:#4367FE}};;true]
$if[$volume<100]
$volume[$get[VOLUME]]
$let[VOLUME;$replaceText[$replaceText[$checkCondition[$math[$volume+10]>=100];true;100];false;$math[$volume+10]]]
$endif
$endif
$checkVoice
$checkPerms`,
    },
    {
        name: 'volumedown',
        type: 'interaction',
        prototype: 'button',
        $if: 'old',
        code: `
$if[$hasPlayer==false]
$interactionReply[{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}};;true]
$removeComponents[$channelId;$messageId;all]
$elseif[$playerStatus==stopped||$playerStatus==destroyed]
$interactionReply[{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}};;true]
$removeComponents[$channelId;$messageId;all]
$endelseif
$else
$interactionReply[{newEmbed:{description:$getEmoji[volumeup]  Set the current track volume to \`$volume%\`}{color:#4367FE}};;true]
$if[$volume>0]
$volume[$get[VOLUME]]
$let[VOLUME;$replaceText[$replaceText[$checkCondition[$math[$volume-10]<=0];true;0];false;$math[$volume-10]]]
$endif
$endif
$checkVoice
$checkPerms`,
    },
];
