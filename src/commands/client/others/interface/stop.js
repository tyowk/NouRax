module.exports = {
    name: 'stop',
    type: 'interaction',
    prototype: 'button',
    code: `
$stopTrack
$interactionReply[{newEmbed:{description:$getEmoji[sparkles]  Rax has left the voice channel.
Add more songs with **/play** and keep the music flowing!
The party doesn't have to end—bring on your next track!
$getEmoji[blank]}{color:#4367FE}{image:$nonEscape[https://cdn.noujs.my.id/guild/nourax_banner.png]}};;true]
$onlyIf[$playerStatus!=stopped&&$playerStatus!=destroyed;{newEmbed:{description:$getEmoji[no]  The music player already stopped!}{color:Red}}{ephemeral}{execute:removeComponents}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:$getEmoji[no]  There are no players for this guild!}{color:Red}}{ephemeral}{execute:removeComponents}]
$checkVoice
$checkPerms`
};
