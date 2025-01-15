module.exports = {
    name: 'seek',
    description: 'Move to the desired position on the track',
    options: [
        {
            name: 'duration',
            description: 'Time can be specified. example: 1m 5s',
            type: 3,
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
$elseif[$isSeekable!=true]
$description[$getEmoji[no]  Current track is not seekable!]
$color[Red]
$deleteIn[5s]
$endelseif
$elseif[$parseTime[$getContext[duration;all]]==-1||$parseTime[$message]<1000]
$description[$getEmoji[no]  Please provide a valid format duration!
Example: 1m 5s]
$color[Red]
$deleteIn[5s]
$endelseif
$elseif[$parseTime[$getContext[duration;all]]>$songInfo[durationMs]]
$description[$getEmoji[no]  The duration should not exceed \`$songinfo[duration]\`!]
$color[Red]
$deleteIn[5s]
$endelseif
$else
$description[🔎  Fast-forwarding to \`$getContext[duration;all]\`]
$color[#4367FE]
$seek[$getContext[duration;all]]
$endif
$checkVoice
$checkPerms`,
};
