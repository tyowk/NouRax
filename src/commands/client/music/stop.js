module.exports = {
    name: 'stop',
    description: 'Stop the player and cleared the queue',
    aliases: 'sp',
    cooldown: '3s',
    code: `
$isInteraction
$description[$getEmoji[sparkles]  Rax has left the voice channel.
Add more songs with **/play** and keep the music flowing!
The party doesn't have to end—bring on your next track!
$getEmoji[blank]]
$image[https://cdn.noujs.my.id/guild/nourax_banner.png]
$color[#4367FE]
$stopTrack
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{deleteIn:5s}{ephemeral}]
$onlyIf[$playerStatus!=stopped&&$playerStatus!=destroyed;{newEmbed:{description:$getEmoji[no]  The music player already stopped!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkVoice
$checkPerms`
};
