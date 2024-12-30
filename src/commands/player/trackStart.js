module.exports = [
    {
        name: 'trackStart',
        channel: '$channelId',
        type: 'trackStart',
        $if: 'old',
        code: `
$if[$hasPlayer==true&&$voiceId[$clientId]!=||$hasPlayer==true&&$voiceMemberCount[$voiceId[$clientId]]!=1||$hasPlayer==true&&$channelExists[$channelId]==true]
$setNowPlaying[$get[ID]]
$let[ID;$sendMessage[{newEmbed:{description:$nonEscape[$replaceNowPlaying[$songInfo[sourceName]]  **Now playing [$nonEscape[$replaceText[$songInfo[title];#SEMI#;]]]($songInfo[url])**]}{color:#4367FE}};true]]
$onlyIf[$hasPermsInChannel[$channelId;$clientId;sendmessages;embedlinks]==true;]
$else
$destroyPlayer
$endif`,
    },
];
