module.exports = {
    name: 'node',
    description: 'Display current lavalink node status',
    cooldown: '3s',
    $if: 'old',
    code: `
$isInteraction
$if[$nodeInfo[Node 2;status]==online]
$addField[Node 2;>>> $getEmoji[bdot] \`Status        ::\`  ➜  **$replaceText[$replaceText[$nodeInfo[Node 2;status];online;Connected {$getEmoji[online]}];offline;Disconnected {$getEmoji[offline]}]**
$getEmoji[bdot] \`Uptime        ::\`  ➜  **$nodeInfo[Node 2;uptime]**
$getEmoji[bdot] \`Players       ::\`  ➜  **$numberSeparator[$nodeInfo[Node 2;player.used]]/$numberSeparator[$nodeInfo[Node 2;player.total]]**
$getEmoji[bdot] \`Cores         ::\`  ➜  **$nodeInfo[Node 2;cpu.cores] Core(s)**
$getEmoji[bdot] \`Memory Usage  ::\`  ➜  **$prettyBytes[$nodeInfo[Node 2;memory.used]]/$prettyBytes[$math[$nodeInfo[Node 2;memory.used]+$nodeInfo[Node 2;memory.free]+$nodeInfo[Node 2;memory.reservable]+$nodeInfo[Node 2;memory.allocated]]]**
$getEmoji[bdot] \`System Load   ::\`  ➜  **$roundTenth[$nodeInfo[Node 2;cpu.system];2]%**
$getEmoji[bdot] \`Lavalink Load ::\`  ➜  **$roundTenth[$nodeInfo[Node 2;cpu.lavalink];2]%**]
$endif
$if[$nodeInfo[Node 1;status]==online]
$addField[Node 1;>>> $getEmoji[bdot] \`Status        ::\`  ➜  **$replaceText[$replaceText[$nodeInfo[Node 1;status];online;Connected {$getEmoji[online]}];offline;Disconnected {$getEmoji[offline]}]**
$getEmoji[bdot] \`Uptime        ::\`  ➜  **$nodeInfo[Node 1;uptime]**
$getEmoji[bdot] \`Players       ::\`  ➜  **$numberSeparator[$nodeInfo[Node 1;player.used]]/$numberSeparator[$nodeInfo[Node 1;player.total]]**
$getEmoji[bdot] \`Cores         ::\`  ➜  **$nodeInfo[Node 1;cpu.cores] Core(s)**
$getEmoji[bdot] \`Memory Usage  ::\`  ➜  **$prettyBytes[$nodeInfo[Node 1;memory.used]]/$prettyBytes[$math[$nodeInfo[Node 1;memory.used]+$nodeInfo[Node 1;memory.free]+$nodeInfo[Node 1;memory.reservable]+$nodeInfo[Node 1;memory.allocated]]]**
$getEmoji[bdot] \`System Load   ::\`  ➜  **$roundTenth[$nodeInfo[Node 1;cpu.system];2]%**
$getEmoji[bdot] \`Lavalink Load ::\`  ➜  **$roundTenth[$nodeInfo[Node 1;cpu.lavalink];2]%**]
$endif
$color[#4367FE]
$image[https://cdn.noujs.my.id/guild/transparent.png]
$checkPerms
`
};
