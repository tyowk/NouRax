module.exports = {
    name: '$checkPermsPlayer',
    type: 'aoi.js',
    code: `
$if[$hasPlayer==true]
$onlyIf[$maxQueueSize>=$queueLength;{newEmbed:{description:$nonEscape[$getEmoji[no]]  Maximum queue size reaches $maxQueueSize!}{color:Red}}{deleteIn:5s}{ephemeral}]
$endif
$onlyIf[$hasPermsInChannel[$voiceId;$clientid;speak]==true;{newEmbed:{description:$nonEscape[$getEmoji[no]]  Umm, this is awkward. I don't have \`Speak\` permission!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPermsInChannel[$voiceId;$clientid;connect]==true;{newEmbed:{description:$nonEscape[$getEmoji[no]]  Umm, this is awkward. I don't have \`Connect\` permission!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$voiceId[$authorId]!=;{newEmbed:{description:$nonEscape[$getEmoji[no]]  You need to connect to a voice channel!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPermsInChannel[$channelId;$clientid;embedlinks]==true;$nonEscape[$getEmoji[no]]  Umm, this is awkward. I don't have \`EmbedLinks\` permission!{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPermsInChannel[$channelId;$clientid;viewchannel;sendmessages]==true;]`,
};
