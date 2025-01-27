module.exports = {
    name: 'remove',
    description: 'Remove a specific track from the queue',
    options: [
        {
            name: 'song',
            description: 'Song position in the queue you want to remove',
            type: 10,
            required: true
        }
    ],
    aliases: 'rm',
    cooldown: '3s',
    params: ['<song>'],
    code: `
$isInteraction
$removeTrack[$getContext[song;1]]
$description[$getEmoji[remove]  Removed [$songInfo[title;$getContext[song;1]]]($songInfo[url;$getContext[song;1]]) from the queue]
$color[#4367FE]
$onlyIf[$getContext[song;1]<=$queueLength;{newEmbed:{description:$getEmoji[no]  The queue is empty or invalid track position!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$isNumber[$getContext[song;1]]==true||$getContext[song;1]>0;{newEmbed:{description:$getEmoji[no]  Please provide a valid number!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkVoice
$checkPerms`
};
