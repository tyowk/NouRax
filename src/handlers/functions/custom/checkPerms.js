module.exports = {
    name: '$checkPerms',
    type: 'aoi.js',
    code: `
$commandCooldown[{newEmbed:{description:$getEmoji[no]  Whoa please slow down! Try again %timestamp%}{color:Red}}{ephemeral}{deleteIn:%time%}]
$onlyIf[$hasPermsInChannel[$channelId;$clientid;embedlinks]==true;$nonEscape[$getEmoji[no]]  Umm, this is awkward. I don't have \`EmbedLinks\` permission!{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPermsInChannel[$channelId;$clientid;viewchannel;sendmessages]==true;]`
};
