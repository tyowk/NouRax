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
$description[$replaceNowPlaying[$songInfo[sourceName]]  **[$songInfo[title]]($songInfo[url])**]
$image[$songInfo[thumbnail]]
$addField[Requested by;$songInfo[requester.username] ($songInfo[requester.mention])]
$addField[Duration;$humanizeMs[$currentTrackDuration] / $songInfo[duration]]
$addField[Artist;$songInfo[artist]]
$addButton[1;Search Song;link;$nonEscape[$songInfo[url]];false;$replaceNowPlaying[$songInfo[platform]]]
$color[#4367FE]
$endif
$checkPerms`,
};
