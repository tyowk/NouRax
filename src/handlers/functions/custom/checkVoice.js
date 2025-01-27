module.exports = {
    name: '$checkVoice',
    type: 'aoi.js',
    code: `
$onlyIf[$get[SAMEVOICE]==true;{newEmbed:{description:$nonEscape[$getEmoji[no]]  You are not in the same voice channel!}{color:Red}}{deleteIn:5s}{ephemeral}]
$let[SAMEVOICE;$replaceText[$replaceText[$hasPlayere;truee;$checkCondition[$voiceId[$authorId]==$voiceId[$clientId]]];falsee;true]]
$onlyIf[$voiceId[$authorId]!=;{newEmbed:{description:$nonEscape[$getEmoji[no]]  You need to connect to a voice channel!}{color:Red}}{deleteIn:5s}{ephemeral}]`
};
