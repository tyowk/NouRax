module.exports = {
    name: 'nowplaying',
    description: 'See the information about current playing track',
    aliases: 'np',
    $if: 'old',
    code: `
$isInteraction
$if[$hasPlayer==false]
$description[$getEmoji[no]  There are no players for this guild!]
$color[Red]
$deleteIn[5s]
$elseif[$playerStatus==stopped||$playerStatus==destroyed]
$description[$getEmoji[no]  There are no track currently playing!]
$color[Red]
$deleteIn[5s]
$endelseif
$else
$description[$replaceEmoji[$songInfo[sourceName]]  **Now playing [$songInfo[title]]($songInfo[url])**
$getEmoji[blank]
$getEmoji[bdot] **Artist:**  $songInfo[artist]
$getEmoji[bdot] **Duration:**  $currentTrackDuration[true] / $songInfo[duration]
$getEmoji[bdot] **Requester:**  $songInfo[requester.mention]]
$thumbnail[$songInfo[thumbnail]]
$color[#4367FE]
$addButton[1;Search Song;link;$nonEscape[$songInfo[url]];false;$replaceEmoji[$songInfo[platform]]]
$endif
$checkPerms`,
};
