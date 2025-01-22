module.exports = [
    {
        name: 'guildLeave',
        type: 'guildLeave',
        $if: 'old',
        channel: '$getConfig[logs.leave]',
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
$color[Red]
$title[Kicked from "$nonEscape[$guildName]"]
$addTimestamp
`
    }
];
