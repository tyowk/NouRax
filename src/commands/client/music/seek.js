module.exports = {
    name: 'seek',
    description: 'Move to the desired position on the track',
    cooldown: '3s',
    params: ['<duration>'],
    options: [
        {
            name: 'duration',
            description: 'Time can be specified. example: 1m 5s',
            type: 3,
            required: true
        }
    ],
    code: `
$isInteraction
$description[🔎  Fast-forwarding to \`$getContext[duration;all]\`]
$color[#4367FE]
$seek[$getContext[duration;all]]
$onlyIf[$parseTime[$getContext[duration;all]]<$songInfo[durationMs];{newEmbed:{description:$getEmoji[no]  The duration should not exceed \`$songinfo[duration]\`!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$parseTime[$getContext[duration;all]]!=-1||$parseTime[$message]>1000;{newEmbed:{description:$getEmoji[no]  Please provide a valid format duration!
Example: 1m 5s}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$isSeekable==true;{newEmbed:{description:$getEmoji[no]  Current track is not seekable!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$playerStatus!=stopped&&$playerStatus!=destroyed;{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkVoice
$checkPerms`
};
