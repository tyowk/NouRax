module.exports = {
    name: 'lyrics',
    description: 'Display or search lyrics of the track',
    cooldown: '3s',
    aliases: 'ly',
    params: ['[search]'],
    options: [
        {
            name: 'search',
            description: 'The song title',
            type: 3,
            required: false
        }
    ],
    $if: 'old',
    code: `
$isInteraction
$if[$getContext[search;all]==]
$componentCollector[$get[ID];$authorId;5m;30s;lyricsPrevious,lyricsNext;previousPage,nextPage;{newEmbed:{description:$getEmoji[no]  Nuh uh uh... you can't use this button!}{color:Red}}{interaction}{ephemeral};timeoutComponents;{ "type": "lyrics" }]
$let[ID;$sendMessage[{newEmbed:{thumbnail:$nonEscape[$lyrics[$songInfo[title];thumbnail]]}{title:$nonEscape[$getEmoji[queue]  **$lyrics[$songInfo[title];title] by $lyrics[$songInfo[title];artist]**]}{description:$nonEscape[>>> $chunkedText[1]]}{color:#4367FE}}{actionRow:{button::2:lyricsPrevious_0:true:$getEmoji[previouspage]}{button:Lyrics:2:length:true}{button:1 / $chunkedLength:2:page:true}{button::2:lyricsNext_2:false:$getEmoji[nextpage]}};true]]
$onlyIf[$chunkedLength>1;{newEmbed:{thumbnail:$nonEscape[$lyrics[$songInfo[title];thumbnail]]}{title:$nonEscape[$getEmoji[queue]  **$lyrics[$songInfo[title];title] by $lyrics[$songInfo[title];artist]**]}{description:$nonEscape[>>> $chunkedText[1]]}{color:#4367FE}}]
$onlyIf[$chunkedLength>=1;{newEmbed:{description:$nonEscape[$getEmoji[no]]  No results found}{color:Red}}{ephemeral}{deleteIn:5s}]
$textChunk[$lyrics[$songInfo[title]];500]
$interactionDefer
$onlyIf[$playerStatus!=stopped&&$playerStatus!=destroyed;{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}{ephemeral}]
$else
$componentCollector[$get[ID];$authorId;5m;30s;lyricsPrevious,lyricsNext;previousPage,nextPage;{newEmbed:{description:$getEmoji[no]  Nuh uh uh... you can't use this button!}{color:Red}}{interaction}{ephemeral};timeoutComponents;{ "type": "lyrics" }]
$let[ID;$sendMessage[{newEmbed:{thumbnail:$nonEscape[$lyrics[$getContext[search;all];thumbnail]]}{title:$nonEscape[$getEmoji[queue]  **$lyrics[$get[TITLE];title] by $lyrics[$get[TITLE];artist]**]}{description:$nonEscape[>>> $chunkedText[1]]}{color:#4367FE}}{actionRow:{button::2:lyricsPrevious_0:true:$getEmoji[previouspage]}{button:Lyrics:2:length:true}{button:1 / $chunkedLength:2:page:true}{button::2:lyricsNext_2:false:$getEmoji[nextpage]}};true]]
$onlyIf[$chunkedLength>1;{newEmbed:{thumbnail:$nonEscape[$lyrics[$get[TITLE];thumbnail]]}{title:$nonEscape[$getEmoji[queue]  **$lyrics[$get[TITLE];title] by $lyrics[$get[TITLE];artist]**]}{description:$nonEscape[>>> $chunkedText[1]]}{color:#4367FE}}]
$onlyIf[$chunkedLength>=1;{newEmbed:{description:$nonEscape[$getEmoji[no]]  No results found}{color:Red}}{ephemeral}{deleteIn:5s}]
$textChunk[$lyrics[$get[TITLE]];500]
$let[TITLE;$getContext[search;all]]
$interactionDefer
$endif
$checkPerms`
};
