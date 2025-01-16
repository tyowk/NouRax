module.exports = [
    {
        name: 'search',
        description: 'Search for multiple tracks',
        options: [
            {
                name: 'song',
                description: 'Song title you want to search',
                type: 3,
                required: true,
            },
        ],
        $if: 'old',
        code: `
$isInteraction
$componentCollector[$get[ID];$authorId;5m;30s;searching;searching;{newEmbed:{description:$getEmoji[no]  Nuh uh uh... you can't use this button!}{color:Red}}{interaction}{ephemeral};timeoutComponents]
$let[ID;$sendMessage[{newEmbed:{title:$nonEscape[🔎  Results for "$getContext[song;all]"]}{description:$nonEscape[$search[$getContext[song;all];$searchEngine;{position}. [{title}]({url}) by {artist};10]]}{color:#4367FE}{footer:$nonEscape[Requested by $username]:$nonEscape[$authorAvatar]}}
{actionRow:{button:1:1:$nonEscape[searching__$splitText[1]]}{button:2:1:$nonEscape[searching__$splitText[2]]}{button:3:1:$nonEscape[searching__$splitText[3]]}{button:4:1:$nonEscape[searching__$splitText[4]]}{button:5:1:$nonEscape[searching__$splitText[5]]}}
{actionRow:{button:6:1:$nonEscape[searching__$splitText[6]]}{button:7:1:$nonEscape[searching__$splitText[7]]}{button:8:1:$nonEscape[searching__$splitText[8]]}{button:9:1:$nonEscape[searching__$splitText[9]]}{button:10:1:$nonEscape[searching__$splitText[10]]}};true]]
$textSplit[$search[$getContext[song;all];$searchEngine;{url};10;#SPACEURLTRACKS#];#SPACEURLTRACKS#]
$onlyIf[$checkContains[$trackLoadType[$getContext[song;all]];search]==true;{newEmbed:{description:$nonEscape[$getEmoji[no]]  No results found}{color:Red}}{deleteIn:10s}]
$onlyIf[$isYoutubeLink[$getContext[song;all]]==false;{newEmbed:{description:$nonEscape[$getEmoji[no]]  Sorry, this bot doesn't support YouTube at the moment. Please try another music platform!}{color:Red}}{deleteIn:10s}]
$onlyIf[$getContext[song;all]!=;{newEmbed:{description:$nonEscape[$getEmoji[no]]  Nu uh uh... please provide a valid url or song title!}{color:Red}}{deleteIn:10s}{ephemeral}]
$checkVoice
$checkPermsPlayer
$checkPerms
`,
    },
    {
        name: 'searching',
        type: 'awaited',
        $if: 'old',
        code: `
$if[$hasPlayer==false&&$playerStatus==destroyed||$hasPlayer==false&&$playerStatus==stopped]
$interactionEdit[{newEmbed:{description:$nonEscape[$getEmoji[queue]]  Added to queue **[$songInfo[title]]($songInfo[url])**}{color:#4367FE}{footer:$songInfo[artist] | $songInfo[duration]:$songInfo[artworkUrl]}}]
$playTrack[$splitText[2]]
$joinvc
$else
$interactionEdit[{newEmbed:{description:$nonEscape[$getEmoji[queue]]  Added to queue **[$songInfo[title;$sum[$get[QUEUE];1]]]($songInfo[url;$sum[$get[QUEUE];1]])**}{color:#4367FE}{footer:$songInfo[artist;$sum[$get[QUEUE];1]] | $songInfo[duration;$sum[$get[QUEUE];1]]:$songInfo[artworkUrl;$sum[$get[QUEUE];1]]}}]
$playTrack[$splitText[2]]
$let[QUEUE;$textTrim[$replaceText[$replaceText[$checkCondition[$isCurrentExists==false];false;$queueLength];true;-1]]]
$endif
$interactionDefer[true]
$editButton[$nonEscape[$interactionData[customId]];;2;true;;$messageId;$channelId]
$onlyIf[$isYoutubeLink[$splitText[2]]==false;{newEmbed:{description:$nonEscape[$getEmoji[no]]  Sorry, this bot doesn't support YouTube at the moment. Please try another music platform!}{color:Red}}{deleteIn:10s}{ephemeral}]
$textSplit[$interactionData[customId];__]
$checkVoice
$checkPermsPlayer
$checkPerms`,
    },
];
