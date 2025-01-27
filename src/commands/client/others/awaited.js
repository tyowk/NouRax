module.exports = [
    {
        name: 'nextPage',
        type: 'awaited',
        code: `
$nextPage[$awaitData[type]]
$checkPerms`
    },
    {
        name: 'previousPage',
        type: 'awaited',
        code: `
$previousPage[$awaitData[type]]
$checkPerms`
    },
    {
        name: 'timeoutComponents',
        type: 'awaited',
        code: `
$setComponentStates[disabled;$messageId;$channelId]
`
    },
    {
        name: 'removeComponents',
        type: 'awaited',
        code: `
$setComponentStates[remove;$messageId;$channelId]
`
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
$checkPerms`
    },
    {
        name: 'handleStates',
        type: 'awaited',
        code: `
$description[The voice channel is empty more than 1 minute
Stopped the player and leaving the voice channel]
$color[Red]
$useChannel[$get[ID]]
$onlyIf[$channelExists[$get[ID]]==true&&$hasPermsInChannel[$get[ID];$clientId;sendmessages;embedlinks]==true;]
$destroyPlayer
$deleteNowPlaying
$let[ID;$playerChannelId]
$onlyif[$hasPlayer==true&&$voiceMemberCount[$voiceId[$clientid]]==1;]
$onlyIf[$voiceId[$clientId]!=;]
$wait[1m]
$suppressErrors`
    }
];
