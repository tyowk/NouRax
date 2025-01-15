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
$elseif[$playerStatus==stopped||$playerStatus==destroyed]
$description[$getEmoji[no]  There are no track currently playing!]
$color[Red]
$deleteIn[5s]
$endelseif
$else
$componentCollector[$get[ID];$authorId;5m;30s;lyricsPrevious,lyricsNext;lyricsPrevious,lyricsNext;{newEmbed:{description:$getEmoji[no]  Nuh uh uh... you can't use this button!}{color:Red}}{interaction}{ephemeral};timeoutComponents]
$let[ID;$sendMessage[{newEmbed:{title:$nonEscape[$getEmoji[queue]  **$lyrics[$songInfo[title];title] by $lyrics[$songInfo[title];artist]**]}{description:$nonEscape[>>> $chunkedText[1]]}{color:#4367FE}}{actionRow:{button::2:lyricsPrevious_0:true:$getEmoji[previouspage]}{button:Lyrics:2:length:true}{button:1 / $chunkedLength:2:page:true}{button::2:lyricsNext_2:false:$getEmoji[nextpage]}};true]]
$onlyIf[$chunkedLength>1;{newEmbed:{title:$nonEscape[$getEmoji[queue]  **$lyrics[$songInfo[title];title] by $lyrics[$songInfo[title];artist]**]}{description:$nonEscape[>>> $chunkedText[1]]}{color:#4367FE}}]
$onlyIf[$chunkedLength>=1;{newEmbed:{description:$nonEscape[$getEmoji[no]]  No results found}{color:Red}}{ephemeral}{deleteIn:5s}]
$textChunk[$lyrics[$songInfo[title]];500]
$endif
$else
$componentCollector[$get[ID];$authorId;5m;30s;lyricsPrevious,lyricsNext;lyricsPrevious,lyricsNext;{newEmbed:{description:$getEmoji[no]  Nuh uh uh... you can't use this button!}{color:Red}}{interaction}{ephemeral};timeoutComponents]
$let[ID;$sendMessage[{newEmbed:{title:$nonEscape[$getEmoji[queue]  **$lyrics[$getContext[search;all];title] by $lyrics[$getContext[search;all];artist]**]}{description:$nonEscape[>>> $chunkedText[1]]}{color:#4367FE}}{actionRow:{button::2:lyricsPrevious_0:true:$getEmoji[previouspage]}{button:Lyrics:2:length:true}{button:1 / $chunkedLength:2:page:true}{button::2:lyricsNext_2:false:$getEmoji[nextpage]}};true]]
$onlyIf[$chunkedLength>1;{newEmbed:{title:$nonEscape[$getEmoji[queue]  **$lyrics[$getContext[search;all];title] by $lyrics[$getContext[search;all];artist]**]}{description:$nonEscape[>>> $chunkedText[1]]}{color:#4367FE}}]
$onlyIf[$chunkedLength>=1;{newEmbed:{description:$nonEscape[$getEmoji[no]]  No results found}{color:Red}}{ephemeral}{deleteIn:5s}]
$textChunk[$lyrics[$getContext[search;all]];500]
$endif
$checkPerms`,
    },
    {
        name: 'lyricsNext',
        type: 'awaited',
        $if: 'old',
        code: `
$nextPage[lyrics]
$checkPerms
`,
    },
    {
        name: 'lyricsPrevious',
        type: 'awaited',
        $if: 'old',
        code: `
$previousPage[lyrics]
$checkPerms
`,
    },
];
