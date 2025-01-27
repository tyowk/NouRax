module.exports = {
    name: 'disconnect',
    description: 'Disconnect from a voice channel',
    cooldown: '3s',
    aliases: ['dc', 'leave'],
    code: `
$isInteraction
$leavevc
$deleteNowPlaying
$description[$getEmoji[volumeup]  Leaving the voice channel <#$voiceId[$clientId]>]
$color[#4367FE]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkVoice
$checkPerms`
};
