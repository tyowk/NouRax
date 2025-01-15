module.exports = {
    name: 'play',
    description: 'Add new track to the guild queue',
    aliases: 'p',
    options: [
        {
            name: 'song',
            description: 'Song title or a valid url',
            type: 3,
            required: true,
        },
    ],
    $if: 'old',
    code: `
$isInteraction
$if[$hasPlayer==false&&$playerStatus==destroyed||$hasPlayer==false&&$playerStatus==stopped]
$if[$checkContains[$trackLoadType[$getContext[song;all]];track;search;playlist]==true]
$description[$getEmoji[queue]  Added to queue **[$songInfo[title]]($songInfo[url])** $replaceText[$replaceText[$checkCondition[$sub[$queueLength;1]>$get[QUEUE]];true;and $sub[$sub[$queueLength;1];$get[QUEUE]] other song(s)];false;]]
$color[#4367FE]
$footer[$songInfo[artist] | $songInfo[duration];$songInfo[artworkUrl]]
$playTrack[$getContext[song;all]]
$let[QUEUE;$queueLength]
$joinvc
$else
$description[$getEmoji[no]  No results found]
$color[Red]
$deleteIn[10s]
$endif
$else
$if[$checkContains[$trackLoadType[$getContext[song;all]];track;search;playlist]==true]
$description[$getEmoji[queue]  Added to queue **[$songInfo[title;$sum[$get[QUEUE];1]]]($songInfo[url;$sum[$get[QUEUE];1]])** $replaceText[$replaceText[$checkCondition[$sub[$queueLength;1]>$get[QUEUE]];true;and $sub[$sub[$queueLength;1];$get[QUEUE]] other song(s)];false;]]
$color[#4367FE]
$footer[$songInfo[artist;$sum[$get[QUEUE];1]] | $songInfo[duration;$sum[$get[QUEUE];1]];$songInfo[artworkUrl;$sum[$get[QUEUE];1]]]
$playTrack[$getContext[song;all]]
$let[QUEUE;$textTrim[$replaceText[$replaceText[$checkCondition[$isCurrentExists==false];false;$queueLength];true;-1]]]
$else
$description[$getEmoji[no]  No results found]
$color[Red]
$deleteIn[10s]
$endif
$endif
$onlyIf[$getContext[song;all]!=;{newEmbed:{description:$nonEscape[$getEmoji[no]]  Nu uh uh... please provide a valid url or song title!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkVoice
$checkPermsPlayer
$checkPerms
`,
};
