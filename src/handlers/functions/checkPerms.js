module.exports = {
    name: '$checkPerms',
    type: 'aoi.js',
    code: `
$onlyIf[$hasPermsInChannel[$channelId;$clientid;embedlinks]==true;$nonEscape[$getEmoji[no]]  Umm, this is awkward. I don't have \`EmbedLinks\` permission!{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPermsInChannel[$channelId;$clientid;viewchannel;sendmessages]==true;]`,
};
