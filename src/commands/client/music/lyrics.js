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
$title[**$lyrics[$songInfo[title];title] by $lyrics[$songInfo[title];artist]**]
$description[>>> $chunkedText[1]]
$color[#4367FE]
$onlyIf[$chunkedLength>=1;{newEmbed:{description:$nonEscape[$getEmoji[no]]  No results found}{color:Red}}{ephemeral}{deleteIn:5s}]
$textChunk[$lyrics[$songInfo[title]];3996]
$endif
$else
$title[**$lyrics[$getContext[search;all];title] by $lyrics[$getContext[search;all];artist]**]
$description[>>> $chunkedText[1]]
$color[#4367FE]
$onlyIf[$chunkedLength>=1;{newEmbed:{description:$nonEscape[$getEmoji[no]]  No results found}{color:Red}}{ephemeral}{deleteIn:5s}]
$textChunk[$lyrics[$getContext[search;all]];3996]
$endif
$checkPerms`,
    },
];
