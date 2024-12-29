module.exports = {
    name: 'ping',
    description: 'Pong! check if the bot is online',
    aliases: 'pong',
    $if: 'old',
    code: `
$isInteraction
$if[$hasPlayer==true]
$addField[Player;\`\`\`js
$playerPingms
\`\`\`;true]
$endif
$addField[Database;\`\`\`js
unknown
\`\`\`;true]
$addField[Bot Latency;\`\`\`js
$replaceText[$messageping$interactionPing;NaN;]ms
\`\`\`;true]
$addField[API Latency;\`\`\`js
$pingms
\`\`\`;true]
$color[#4367FE]
$checkPerms`,
};
