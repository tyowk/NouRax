module.exports = {
    name: 'move',
    description: 'move a specific track to a new position in the queue',
    params: ['<from>', '<to>'],
    aliases: 'mv',
    cooldown: '3s',
    options: [
        {
            name: 'from',
            description: 'Old song position in the queue you want to move',
            type: 10,
            required: true
        },
        {
            name: 'to',
            description: 'New song position in the queue you want to move',
            type: 10,
            required: true
        }
    ],
    code: `
$isInteraction
$moveTrack[$getContext[from;1];$getContext[to;2]]
$description[$getEmoji[shuffle]  Moved [$songInfo[title;$getContext[from;1]]]($songInfo[url;$getContext[from;1]]) from position **$numberSeparator[$getContext[from;1]]** to position **$numberSeparator[$getContext[to;2]]**]
$color[#4367FE]
$onlyIf[$getContext[from;1]<=$queueLength&&$getContext[to;2]<=$queueLength;{newEmbed:{description:$getEmoji[no]  The queue is empty or invalid track position!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$isNumber[$getContext[from;1]]==true||$getContext[from;1]>0||$isNumber[$getContext[to;2]]==true||$getContext[to;2]>0;{newEmbed:{description:$getEmoji[no]  Please provide a valid number or track position!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkVoice
$checkPerms`
};
