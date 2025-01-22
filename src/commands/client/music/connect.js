module.exports = {
    name: 'connect',
    description: 'Connect to a voice channel',
    params: ['[channel]'],
    aliases: ['summon', 'join'],
    cooldown: '3s',
    options: [
        {
            name: 'channel',
            description: 'Select the voice channel',
            type: 7,
            required: false,
            channel_types: [2]
        }
    ],
    code: `
$isInteraction
$description[$getEmoji[volumeup]  Joined to <#$voiceId[$clientId]>]
$color[#4367FE]
$joinvc[$getContext[channel;false]]
$onlyIf[$hasPlayer==false;{newEmbed:{description:$getEmoji[no]  I already joined to <#$voiceId[$clientId]>!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkVoice
$checkPerms`
};
