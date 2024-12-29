module.exports = [
    {
        name: 'trackStart',
        channel: '$channelId',
        type: 'trackStart',
        code: `
$setNowPlaying[$get[ID]]
$let[ID;$sendMessage[{newEmbed:{description:$nonEscape[$replaceNowPlaying[$songInfo[sourceName]]  **Now playing [$nonEscape[$replaceText[$songInfo[title];#SEMI#;]]]($songInfo[url])**]}{color:#4367FE}};true]]
$onlyIf[$hasPermsInChannel[$channelId;$clientId;sendmessages;embedlinks]==true;]
$onlyIf[$channelExists[$channelId]==true;]`,
    },
];
