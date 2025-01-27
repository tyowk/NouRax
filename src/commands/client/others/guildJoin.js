module.exports = [
    {
        name: 'guildJoin',
        type: 'guildJoin',
        $if: 'old',
        channel: '$getConfig[logs.join]',
        code: `
$thumbnail[$guildIcon[$guildId]]
$addField[Information;>>> - Shard ID: $numberSeparator[$djseval[client.cluster?.id || 0;true]]
- Channels: $numberSeparator[$channelCount]
- Members: $numberSeparator[$membersCount]
- Roles: $numberSeparator[$roleCount]
- Level: $guildVerificationLevel]
$addField[Owner;$username[$guildOwnerId] (\`$guildOwnerId\`)]
$addField[Guild ID;\`$guildId\`]
$addField[Guild Name;$guildName]
$color[Green]
$title[Added to "$nonEscape[$guildName]"]
$addTimestamp
`
    }
];
