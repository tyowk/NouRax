module.exports = {
    name: 'connect',
    description: 'Connect to a voice channel',
    aliases: 'join',
    options: [
        {
            name: 'channel',
            description: 'Select the voice channel',
            type: 7,
            required: false,
            channel_types: [2],
        },
    ],
    $if: 'old',
    code: `
$isInteraction
$if[$hasPlayer==true]
$description[$getEmoji[no]  I already joined to <#$voiceId[$clientId]>!]
$color[Red]
$deleteIn[5s]
$else
$description[$getEmoji[yes]  Joined to <#$voiceId[$clientId]>]
$color[#4367FE]
$joinvc[$getContext[channel;false]]
$endif
$checkVoice
$checkPerms`,
};
