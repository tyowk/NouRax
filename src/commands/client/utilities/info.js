module.exports = {
    name: 'info',
    description: 'Displays information about the bot',
    aliases: ['stats', 'information'],
    cooldown: '3s',
    code: `
$isInteraction
$addField[Library Information;>>> $getEmoji[bdot] Programming Language with **[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)**
$getEmoji[bdot] Node.js module with **[aoi.js](https://aoi.js.org)**
$getEmoji[bdot] Database cloud with **[MySQL](https://mysql.com)** **([aoijs.mysql](https://github.com/tyowk/aoijs.mysql))**
$getEmoji[bdot] Music player with **[Lavalink](https://lavalink.dev)** **([aoijs.lavalink](https://github.com/tyowk/aoijs.lavalink))**]
$addField[System Information;>>> $getEmoji[bdot] \`Platform    ::\`  ➜  **$toLocaleUpperCase[$djseval[client.os.platform();true]]**
$getEmoji[bdot] \`Processor   ::\`  ➜  **$djseval[client.os.cpus()[0].model;true]**
$getEmoji[bdot] \`Cores       ::\`  ➜  **$djseval[client.os.cpus().length;true] Core(s)**
$getEmoji[bdot] \`CPU Usage   ::\`  ➜  **$djseval[client.os.loadavg()[0];true]%**
$getEmoji[bdot] \`RAM Usage   ::\`  ➜  **$prettyBytes[$djseval[client.os.totalmem() - client.os.freemem();true]]**
$getEmoji[bdot] \`Total RAM   ::\`  ➜  **$prettyBytes[$djseval[client.os.totalmem();true]]**]
$addField[Client Statistics;>>> $getEmoji[bdot] \`Clusters    ::\`  ➜  **$numberSeparator[$djseval[client.shard?.count;true]]**
$getEmoji[bdot] \`Cluster ID  ::\`  ➜  **$guildShardID**
$getEmoji[bdot] \`Players     ::\`  ➜  **$numberSeparator[$djseval[client.shoukaku.players.size;true]]**
$getEmoji[bdot] \`Servers     ::\`  ➜  **$guildCount**
$getEmoji[bdot] \`Channels    ::\`  ➜  **$numberSeparator[$allChannelsCount]**
$getEmoji[bdot] \`Users       ::\`  ➜  **$numberSeparator[$allMembersCount]**]
$addField[Client Information;>>> $getEmoji[bdot] \`Username    ::\`  ➜  **$username[$clientId]**
$getEmoji[bdot] \`User ID     ::\`  ➜  **$clientId**
$getEmoji[bdot] \`Version     ::\`  ➜  **v1.8.0**
$getEmoji[bdot] \`Uptime      ::\`  ➜  **$uptime**
$getEmoji[bdot] \`API Latency ::\`  ➜  **$pingms**
$getEmoji[bdot] \`Bot Latency ::\`  ➜  **$replaceText[$messageping$interactionPing;NaN;]ms**
$getEmoji[bdot] \`Database    ::\`  ➜  **-1ms**]
$footer[© 2024 NouJS Development]
$color[#4367FE]
$image[https://cdn.noujs.my.id/guild/transparent.png]
$checkPerms
`
};
