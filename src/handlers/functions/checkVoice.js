module.exports = {
    name: '$checkVoice',
    type: 'aoi.js',
    code: `
$if[$hasPlayer==true]
$onlyIf[$voiceId[$clientId]==$voiceId[$authorId];{newEmbed:{description:$nonEscape[$getEmoji[no]]  You are not in the same voice channel!}{color:Red}}{deleteIn:5s}{ephemeral}]
$endif
$onlyIf[$voiceId[$authorId]!=;{newEmbed:{description:$nonEscape[$getEmoji[no]]  You need to connect to a voice channel!}{color:Red}}{deleteIn:5s}{ephemeral}]`,
};
