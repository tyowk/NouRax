module.exports = [
    {
        name: 'lyrics',
        description: 'Display or search lyrics of the track',
        options: [
            {
                name: 'search',
                description: 'The song title',
                type: 3,
                required: false,
            },
        ],
        $if: 'old',
        code: `
$isInteraction
$if[$getContext[search;all]==]
$if[$hasPlayer==false]
$description[$getEmoji[no]  There are no players for this guild!]
$color[Red]
$deleteIn[5s]
$elseif[$isCurrentExist==false||$playerStatus==stopped||$playerStatus==destroyed]
$description[$getEmoji[no]  There are no track currently playing!]
$color[Red]
$deleteIn[5s]
$endelseif
$else
$title[Lyrics for **"$songInfo[title]"**]
$description[>>> $chunkedText[1]]
$color[#4367FE]
$thumbnail[$songInfo[artworkUrl]]
$onlyIf[$chunkedLength>0;{newEmbed:{description:$nonEscape[$getEmoji[no]]  No results found}{color:Red}}{ephemeral}{deleteIn:5s}]
$textChunk[$lyrics[$songInfo[title] - $songInfo[artist]];4000]
$endif
$else
$title[Lyrics for **"$getContext[search;all]"**]
$description[>>> $chunkedText[1]]
$color[#4367FE]
$onlyIf[$chunkedLength>0;{newEmbed:{description:$nonEscape[$getEmoji[no]]  No results found}{color:Red}}{ephemeral}{deleteIn:5s}]
$textChunk[$lyrics[$getContext[search;all]];4000]
$endif
$checkPerms`,
    },
];
