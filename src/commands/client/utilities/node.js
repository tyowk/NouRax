module.exports = {
    name: 'node',
    description: 'Display current lavalink node status',
    $if: 'old',
    code: `
$isInteraction
$if[$lavalinkInfo[Node 2;status]==online]
$addField[Node 2;>>> - \`Status        ::\`  ➜  **$replaceText[$replaceText[$lavalinkInfo[Node 2;status];online;Connected {$getEmoji[online]}];offline;Disconnected {$getEmoji[offline]}]**
- \`Uptime        ::\`  ➜  **$lavalinkInfo[Node 2;uptime]**
- \`Players       ::\`  ➜  **$numberSeparator[$lavalinkInfo[Node 2;player.used]]/$numberSeparator[$lavalinkInfo[Node 2;player.total]]**
- \`Cores         ::\`  ➜  **$lavalinkInfo[Node 2;cpu.cores] Core(s)**
- \`Memory Usage  ::\`  ➜  **$prettyBytes[$lavalinkInfo[Node 2;memory.used]]/$prettyBytes[$math[$lavalinkInfo[Node 2;memory.used]+$lavalinkInfo[Node 2;memory.free]+$lavalinkInfo[Node 2;memory.reservable]+$lavalinkInfo[Node 2;memory.allocated]]]**
- \`System Load   ::\`  ➜  **$roundTenth[$lavalinkInfo[Node 2;cpu.system];2]%**
- \`Lavalink Load ::\`  ➜  **$roundTenth[$lavalinkInfo[Node 2;cpu.lavalink];2]%**]
$endif
$if[$lavalinkInfo[Node 1;status]==online]
$addField[Node 1;>>> - \`Status        ::\`  ➜  **$replaceText[$replaceText[$lavalinkInfo[Node 1;status];online;Connected {$getEmoji[online]}];offline;Disconnected {$getEmoji[offline]}]**
- \`Uptime        ::\`  ➜  **$lavalinkInfo[Node 1;uptime]**
- \`Players       ::\`  ➜  **$numberSeparator[$lavalinkInfo[Node 1;player.used]]/$numberSeparator[$lavalinkInfo[Node 1;player.total]]**
- \`Cores         ::\`  ➜  **$lavalinkInfo[Node 1;cpu.cores] Core(s)**
- \`Memory Usage  ::\`  ➜  **$prettyBytes[$lavalinkInfo[Node 1;memory.used]]/$prettyBytes[$math[$lavalinkInfo[Node 1;memory.used]+$lavalinkInfo[Node 1;memory.free]+$lavalinkInfo[Node 1;memory.reservable]+$lavalinkInfo[Node 1;memory.allocated]]]**
- \`System Load   ::\`  ➜  **$roundTenth[$lavalinkInfo[Node 1;cpu.system];2]%**
- \`Lavalink Load ::\`  ➜  **$roundTenth[$lavalinkInfo[Node 1;cpu.lavalink];2]%**]
$endif
$color[#4367FE]
$checkPerms
`,
};
