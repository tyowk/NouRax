module.exports = {
    name: 'grab',
    description: 'Grab currently playing track and sending it to your DM',
    aliases: 'gr',
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
$elseif[$isUserDmEnabled[$authorId]==false]
$description[$getEmoji[no]  Your DM is currently disabled!]
$color[Red]
$deleteIn[5s]
$endelseif
$else
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
$endif
$checkPerms`,
};
