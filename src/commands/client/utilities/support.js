module.exports = {
    name: 'support',
    description: 'Need help? Join to my support server!',
    cooldown: '3s',
    code: `
$isInteraction[$getEmoji[bdot] https://discord.com/invite/hyQYXcVnmZ]
$getEmoji[bdot] https://discord.com/invite/hyQYXcVnmZ
$addButton[1;Support Server;link;https://discord.gg/hyQYXcVnmZ]
$addButton[1;Invite Me!;link;https://discord.com/oauth2/authorize?client_id=1297801416848441386&permissions=34949376&scope=bot%20applications.commands]
$checkPerms`
};
