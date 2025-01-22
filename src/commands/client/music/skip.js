module.exports = {
    name: 'skip',
    description: 'Skip the current playing track',
    aliases: ['sk', 's'],
    cooldown: '3s',
    code: `
$isInteraction
$description[$getEmoji[skip]  Skipped to the next song]
$color[#4367FE]
$skipTrack
$onlyIf[$playerStatus!=stopped&&$playerStatus!=destroyed;{newEmbed:{description:$getEmoji[no]  There are no track currently playing!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkVoice
$checkPerms`
};
