module.exports = {
    name: 'info',
    description: 'Displays information about the bot',
    $if: 'old',
    code: `
$isInteraction
$addField[Library Information;>>> - Programming Language with **[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)**
- Node.js module with **[aoi.js](https://aoi.js.org)**
- Music player with **[Lavalink](https://lavalink.dev)** + **([aoijs.lavalink](https://github.com/tyowk/aoijs.lavalink))**]
$addField[System Information;>>> - \`Platform    ::\`  ➜  **$toLocaleUpperCase[$djseval[client.os.platform();true]]**
- \`Processor   ::\`  ➜  **$djseval[client.os.cpus()[0].model;true]**
- \`Cores       ::\`  ➜  **$djseval[client.os.cpus().length;true] Core(s)**
- \`CPU Usage   ::\`  ➜  **$djseval[client.os.loadavg()[0];true]%**
- \`RAM Usage   ::\`  ➜  **$prettyBytes[$djseval[client.os.totalmem() - client.os.freemem();true]]**
- \`Total RAM   ::\`  ➜  **$prettyBytes[$djseval[client.os.totalmem();true]]**]
$addField[Client Statistics;>>> - \`Cluster(s)  ::\`  ➜  **$numberSeparator[$djseval[client.cluster?.count;true]]**
- \`Shard(s)    ::\`  ➜  **$numberSeparator[$djseval[client.cluster?.shardList?.length;true]]**
- \`Player(s)   ::\`  ➜  **$numberSeparator[$djseval[client.shoukaku.players.size;true]]**
- \`Server(s)   ::\`  ➜  **$guildCount**
- \`Channel(s)  ::\`  ➜  **$numberSeparator[$allChannelsCount]**
- \`User(s)     ::\`  ➜  **$numberSeparator[$allMembersCount]**]
$addField[Client Information;>>> - \`Username    ::\`  ➜  **$username[$clientId]**
- \`User ID     ::\`  ➜  **$clientId**
- \`Version     ::\`  ➜  **v1.0.0**
- \`Uptime      ::\`  ➜  **$uptime**
- \`API Latency ::\`  ➜  **$pingms**
- \`Bot Latency ::\`  ➜  **$replaceText[$messageping$interactionPing;NaN;]ms**
- \`Database    ::\`  ➜  **unknown**]
$footer[© 2024 NouJS Development]
$color[#4367FE]
$checkPerms
`,
};
