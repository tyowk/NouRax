module.exports = {
    name: 'ping',
    description: 'Pong! check if the bot is online',
    aliases: 'pong',
    cooldown: '3s',
    $if: 'old',
    code: `
$isInteraction
$if[$hasPlayer==true]
$addField[$getEmoji[bdot] Player;\`\`\`js
* $playerPingms
\`\`\`;true]
$endif
$addField[$getEmoji[bdot] Database;\`\`\`js
* -1ms
\`\`\`;true]
$addField[$getEmoji[bdot] Bot Latency;\`\`\`js
* $replaceText[$messageping$interactionPing;NaN;]ms
\`\`\`;true]
$addField[$getEmoji[bdot] API Latency;\`\`\`js
* $pingms
\`\`\`;true]
$color[#4367FE]
$image[https://cdn.noujs.my.id/guild/transparent.png]
$checkPerms`
};
