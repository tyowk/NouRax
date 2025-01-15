module.exports = {
    name: 'skipto',
    description: 'Skip to specific track in the queue',
    options: [
        {
            name: 'song',
            description: 'Track position in the queue',
            type: 4,
            required: true,
        },
    ],
    aliases: 'st',
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
$elseif[$isNumber[$getContext[song;1]]!=true||$getContext[song;1]<0]
$description[$getEmoji[no]  Please provide a valid number!]
$color[Red]
$deleteIn[5s]
$endelseif
$elseif[$getContext[song;1]>$queueLength]
$description[$getEmoji[no]  The queue is empty!]
$color[Red]
$deleteIn[5s]
$endelseif
$else
$skipto[$getContext[song;1]]
$description[$getEmoji[skip]  Skipped to [$songInfo[title;$getContext[song;1]]]($songInfo[url;$getContext[song;1]])]
$color[#4367FE]
$endif
$checkVoice
$checkPerms`,
};
