module.exports = {
    name: 'volume',
    description: 'Change the current track volume',
    aliases: 'v',
    options: [
        {
            name: 'volume',
            description: 'Track volume, should not exceed 100%',
            type: 10,
            required: true,
        },
    ],
    $if: 'old',
    code: `
$isInteraction
$if[$hasPlayer==false]
$description[$getEmoji[no]  There are no players for this guild!]
$color[Red]
$deleteIn[5s]
$elseif[$playerStatus==stopped||$playerStatus==destroyed]
$description[$getEmoji[no]  There are no track currently playing!]
$color[Red]
$deleteIn[5s]
$endelseif
$elseif[$getContext[volume;1]==]
$description[Current track volume is \`$volume%\`]
$color[#4367FE]
$endelseif
$elseif[$isNumber[$getContext[volume;1]]!=true||$getContext[volume;1]<0]
$description[$getEmoji[no]  Please provide a valid number!]
$color[Red]
$deleteIn[5s]
$endelseif
$elseif[$getContext[volume;1]>100]
$description[$getEmoji[no]  The volume should not exceed \`100%\`]
$color[Red]
$deleteIn[5s]
$endelseif
$else
$description[$getEmoji[volumeup]  Set the current track volume to \`$volume%\`]
$color[#4367FE]
$volume[$getContext[volume;1]]
$endif
$checkVoice
$checkPerms`,
};
