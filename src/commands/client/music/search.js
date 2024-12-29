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
$if[$checkContains[$loadTrackType[$getContext[song;all]];search]==true]
$title[🔎  Results for "$getContext[song;all]"]
$description[$search[$getContext[song;all];$searchEngine;{position}. [{title}]({url}) by {artist};9]]
$color[#4367FE]
$footer[Requested by $username;$authorAvatar]
$addButton[2;X;danger;delete_$authorId]
$addButton[2;9;primary;search___$authorId___$splitText[9]]
$addButton[2;8;primary;search___$authorId___$splitText[8]]
$addButton[2;7;primary;search___$authorId___$splitText[7]]
$addButton[2;6;primary;search___$authorId___$splitText[6]]
$addButton[1;5;primary;search___$authorId___$splitText[5]]
$addButton[1;4;primary;search___$authorId___$splitText[4]]
$addButton[1;3;primary;search___$authorId___$splitText[3]]
$addButton[1;2;primary;search___$authorId___$splitText[2]]
$addButton[1;1;primary;search___$authorId___$splitText[1]]
$textSplit[$search[$getContext[song;all];$searchEngine;{url};9;#SPACEURL#];#SPACEURL#]
$else
$description[$getEmoji[no]  Hmm... no results found]
$color[Red]
$deleteIn[10s]
$endif
$onlyIf[$message!=;{newEmbed:{description:$nonEscape[$getEmoji[no]]  Nu uh uh... please provide a song title!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$lavalinkInfo[Node 1;status]!=offline;{newEmbed:{description:$nonEscape[$getEmoji[no]]  There is no available nodes to connect on!}{color:Red}}{ephemeral}{deleteIn:5s}]
$checkVoice
$checkPermsPlayer
$checkPerms
`,
    },
    {
        type: 'interaction',
        prototype: 'button',
        $if: 'old',
        code: `
$timeoutComponent
$if[$hasPlayer==false&&$playerStatus==destroyed||$hasPlayer==false&&$playerStatus==stopped]
$interactionEdit[{newEmbed:{description:$nonEscape[$getEmoji[queue]]  Added to queue **[$songInfo[title]]($songInfo[url])**}{color:#4367FE}{footer:$songInfo[artist] | $songInfo[duration]:$songInfo[artworkUrl]}}]
$playTrack[$splitText[3]]
$joinvc
$textSplit[$interactionData[customId];___]
$else
$interactionEdit[{newEmbed:{description:$nonEscape[$getEmoji[queue]]  Added to queue **[$songInfo[title;$sum[$get[QUEUE];1]]]($songInfo[url;$sum[$get[QUEUE];1]])**}{color:#4367FE}{footer:$songInfo[artist;$sum[$get[QUEUE];1]] | $songInfo[duration;$sum[$get[QUEUE];1]]:$songInfo[artworkUrl;$sum[$get[QUEUE];1]]}}]
$playTrack[$splitText[3]]
$let[QUEUE;$textTrim[$replaceText[$replaceText[$checkCondition[$isCurrentExist==false];false;$queueLength];true;-1]]]
$textSplit[$interactionData[customId];___]
$endif
$editButton[$interactionData[customId];✓;1;true;;$messageId]
$interactionDefer
$onlyIf[$lavalinkInfo[Node 1;status]!=offline;{newEmbed:{description:$nonEscape[$getEmoji[no]]  There is no available nodes to connect on!}{color:Red}}{ephemeral}]
$checkVoice
$checkPermsPlayer
$checkPerms
$onlyIf[$authorId==$splitText[2];$getEmoji[no]  Nuh uh uh... you can't use this button!{intetaction}{ephemeral}]
$onlyIf[$splitText[1]==search;]
$textSplit[$interactionData[customId];___]`,
    },
    {
        type: 'interaction',
        prototype: 'button',
        $if: 'old',
        code: `
$removeComponents[$channelId;$messageId;all]
$onlyIf[$authorId==$splitText[2];$getEmoji[no]  Nuh uh uh... you can't use this button!{intetaction}{ephemeral}]
$onlyIf[$splitText[1]==delete;]
$textSplit[$interactionData[customId];_]
`,
    },
];
