module.exports = {
    name: 'volume',
    description: 'Change the current track volume',
    aliases: ['vl', 'vol', 'v'],
    cooldown: '3s',
    params: ['[volume]'],
    options: [
        {
            name: 'volume',
            description: 'Track volume, should not exceed 100%',
            type: 10,
            required: false
        }
    ],
    $if: 'old',
    code: `
$isInteraction
$if[$getContext[volume;1]==]
$description[$getEmoji[volumeup]  Current track volume is \`$volume%\`]
$color[#4367FE]
$else
$description[$getEmoji[volumeup]  Set the current track volume to \`$volume%\`]
$color[#4367FE]
$volume[$getContext[volume;1]]
$onlyIf[$getContext[volume;1]<=100;{newEmbed:{description:$getEmoji[no]  The volume should not exceed \`100%\`}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$isNumber[$getContext[volume;1]]==true||$getContext[volume;1]>0;{newEmbed:{description:$getEmoji[no]  Please provide a valid number!}{color:Red}}{deleteIn:5s}{ephemeral}]
$endif
$onlyIf[$playerStatus!=stopped&&$playerStatus!=destroyed;{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkVoice
$checkPerms`
};
