module.exports = {
    name: 'nowplaying',
    description: 'See the information about current playing track',
    cooldown: '3s',
    aliases: 'np',
    code: `
$isInteraction
$description[$replaceEmoji[$songInfo[sourceName]]  **Now playing [$songInfo[title]]($songInfo[url])**
$getEmoji[blank]
$getEmoji[bdot] **Artist:**  $songInfo[artist]
$getEmoji[bdot] **Duration:**  $currentTrackDuration[true] / $songInfo[duration]
$getEmoji[bdot] **Requester:**  $songInfo[requester.mention]]
$thumbnail[$songInfo[thumbnail]]
$color[#4367FE]
$addButton[1;Search Song;link;$nonEscape[$songInfo[url]];false;$replaceEmoji[$songInfo[platform]]]
$onlyIf[$playerStatus!=stopped&&$playerStatus!=destroyed;{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkPerms`
};
