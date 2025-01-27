module.exports = {
    name: 'search',
    description: 'Search for multiple tracks',
    cooldown: '3s',
    aliases: 'sc',
    params: ['<song>'],
    options: [
        {
            name: 'song',
            description: 'Song title you want to search',
            type: 3,
            required: true
        }
    ],
    code: `
$isInteraction
$componentCollector[$get[ID];$authorId;5m;30s;searching;searching;{newEmbed:{description:$getEmoji[no]  Nuh uh uh... you can't use this button!}{color:Red}}{interaction}{ephemeral};timeoutComponents]
$let[ID;$sendMessage[{newEmbed:{title:$nonEscape[$getEmoji[search]  Results for "$getContext[song;all]"]}{description:$nonEscape[$search[$getContext[song;all];$searchEngine;{position}. [{title}]({url}) by {artist};10]]}{color:#4367FE}{footer:$nonEscape[Requested by $username]:$nonEscape[$authorAvatar]}}
{actionRow:{button:1:1:$nonEscape[searching__$splitText[1]]}{button:2:1:$nonEscape[searching__$splitText[2]]}{button:3:1:$nonEscape[searching__$splitText[3]]}{button:4:1:$nonEscape[searching__$splitText[4]]}{button:5:1:$nonEscape[searching__$splitText[5]]}}
{actionRow:{button:6:1:$nonEscape[searching__$splitText[6]]}{button:7:1:$nonEscape[searching__$splitText[7]]}{button:8:1:$nonEscape[searching__$splitText[8]]}{button:9:1:$nonEscape[searching__$splitText[9]]}{button:10:1:$nonEscape[searching__$splitText[10]]}};true]]
$textSplit[$search[$getContext[song;all];$searchEngine;{url};10;#SPACEURLTRACKS#];#SPACEURLTRACKS#]
$onlyIf[$checkContains[$trackLoadType[$getContext[song;all]];search]==true;{newEmbed:{description:$nonEscape[$getEmoji[no]]  No results found}{color:Red}}{deleteIn:10s}]
$interactionDefer
$onlyIf[$isYoutubeLink[$getContext[song;all]]==false;{newEmbed:{description:$nonEscape[$getEmoji[no]]  Sorry, this bot doesn't support YouTube at the moment. Please try another music platform!}{color:Red}}{deleteIn:10s}]
$onlyIf[$getContext[song;all]!=;{newEmbed:{description:$nonEscape[$getEmoji[no]]  Nu uh uh... please provide a valid url or song title!}{color:Red}}{deleteIn:10s}{ephemeral}]
$checkVoice
$checkPermsPlayer
$checkPerms
`
};
