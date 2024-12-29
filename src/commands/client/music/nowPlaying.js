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
$description[$replaceNowPlaying[$songInfo[sourceName]]  **Now playing [$songInfo[title]]($songInfo[url])**]
$thumbnail[$songInfo[thumbnail]]
$addField[Requested by;$songInfo[requester.username] ($songInfo[requester.mention])]
$addField[Duration;$humanizeMs[$currentTrackDuration] / $songInfo[duration]]
$addField[Artist;$songInfo[artist]]
$color[#4367FE]
$endif
$checkPerms`,
};
