module.exports = {
    name: 'invite',
    description: 'Provides a link to invite me to your server.',
    cooldown: '3s',
    code: `
$isInteraction
$title[Invite Me to Your server!]
$description[Press the button bellow to add me to your server.
Need help? then join to my [support server](https://discord.gg/hyQYXcVnmZ)!]
$color[#4367FE]
$addButton[1;Support;link;https://discord.gg/hyQYXcVnmZ;false;$getEmoji[discord]]
$addButton[1;Invite Me!;link;https://discord.com/oauth2/authorize?client_id=1297801416848441386&permissions=34949376&scope=bot%20applications.commands;false;$getEmoji[link]]
$checkPerms`
};
