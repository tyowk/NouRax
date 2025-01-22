module.exports = {
    name: 'skipto',
    description: 'Skip to specific track in the queue',
    cooldown: '3s',
    params: ['<song>'],
    options: [
        {
            name: 'song',
            description: 'Track position in the queue',
            type: 4,
            required: true
        }
    ],
    aliases: ['skipt', 'st', 'sto'],
    code: `
$isInteraction
$skipto[$getContext[song;1]]
$description[$getEmoji[skip]  Skipped to [$songInfo[title;$getContext[song;1]]]($songInfo[url;$getContext[song;1]])]
$color[#4367FE]
$onlyIf[$getContext[song;1]<=$queueLength;{newEmbed:{description:$getEmoji[no]  The queue is empty or invalid track position!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$isNumber[$getContext[song;1]]==true||$getContext[song;1]>0;{newEmbed:{description:$getEmoji[no]  Please provide a valid number!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkVoice
$checkPerms`
};
