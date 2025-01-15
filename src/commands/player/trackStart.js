module.exports = [
    {
        name: 'trackStart',
        channel: '$channelId',
        type: 'trackStart',
        $if: 'old',
        code: `
$if[$hasPlayer==true&&$voiceId[$clientId]!=||$hasPlayer==true&&$voiceMemberCount[$voiceId[$clientId]]!=1||$hasPlayer==true&&$channelExists[$channelId]==true]
$setNowPlaying[$get[ID]]
$let[ID;$sendMessage[{newEmbed:{description:$nonEscape[$replaceEmoji[$songInfo[sourceName]]  **Now playing [$nonEscape[$replaceText[$songInfo[title];#SEMI#;]]]($songInfo[url])**
$getEmoji[blank]
$getEmoji[bdot] **Artist:**  $songInfo[artist]
$getEmoji[bdot] **Duration:**  $songInfo[duration]
$getEmoji[bdot] **Requester:**  $songInfo[requester.mention]
$getEmoji[blank]]}{thumbnail:$nonEscape[$songInfo[thumbnail]]}{color:#4367FE}}
{actionRow:{button::2:loop:false:$getEmoji[loop]}{button::2:previous:false:$getEmoji[previous]}{button::2:pause:false:$getEmoji[pause]}{button::2:skip:false:$getEmoji[skip]}{button::2:shuffle:false:$getEmoji[shuffle]}}
{actionRow:{button::2:blank1:true:$getEmoji[blank]}{button::2:volumedown:false:$getEmoji[volumedown]}{button::2:stop:false:$getEmoji[stop]}{button::2:volumeup:false:$getEmoji[volumeup]}{button::2:blank2:true:$getEmoji[blank]}};true]]
$onlyIf[$hasPermsInChannel[$channelId;$clientId;sendmessages;embedlinks]==true;]
$else
$destroyPlayer
$endif`,
    },
];
