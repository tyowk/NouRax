module.exports = {
    name: 'remove',
    description: 'Remove a specific track from the queue',
    options: [
        {
            name: 'song',
            description: 'Song position in the queue you want to remove',
            type: 10,
            required: true,
        },
    ],
    aliases: 'rm',
    $if: 'old',
    code: `
$isInteraction
$if[$hasPlayer==false]
$description[$getEmoji[no]  There are no players for this guild!]
$color[Red]
$deleteIn[5s]
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
$removeSong[$getContext[song;1]]
$description[$getEmoji[yes]  Removed [$songInfo[title;$getContext[song;1]]]($songInfo[url;$getContext[song;1]]) from the queue]
$color[#4367FE]
$endif
$checkVoice
$checkPerms`,
};
