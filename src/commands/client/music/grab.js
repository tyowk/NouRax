module.exports = {
    name: 'grab',
    description: 'Grab currently playing track and sending it to your DM',
    aliases: ['gr', 'dm'],
    cooldown: '3s',
    code: `
$isInteraction
$sendMessage[{newEmbed:{description:$getEmoji[yes]  Please check your DM's!}{color:#4367FE}}]
$dm
$description[$replaceEmoji[$songInfo[sourceName]]  **Now playing [$songInfo[title]]($songInfo[url])**
$getEmoji[blank]
$getEmoji[bdot] **Artist:**  $songInfo[artist]
$getEmoji[bdot] **Duration:**  $currentTrackDuration[true] / $songInfo[duration]
$getEmoji[bdot] **Requester:**  $songInfo[requester.mention]
$getEmoji[blank]]
$image[$songInfo[thumbnail]]
$addButton[1;Search Song;link;$nonEscape[$songInfo[url]];false;$replaceEmoji[$songInfo[platform]]]
$color[#4367FE]
$onlyIf[$isUserDmEnabled[$authorId]==true;{newEmbed:{description:$getEmoji[no]  You DM is currently disabled!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$playerStatus!=stopped&&$playerStatus!=destroyed;{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkPerms`
};
