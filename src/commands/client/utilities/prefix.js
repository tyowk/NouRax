module.exports = {
    name: 'prefix',
    description: 'Set custom prefix for this server',
    params: ['<prefix>'],
    cooldown: '3s',
    options: [
        {
            name: 'prefix',
            description: 'The new prefix you want to change',
            type: 3,
            required: true
        }
    ],
    code: `
$isInteraction
$description[Sorry but, this feature is not available now.]
$title[Coming Soon!]
$color[#4367FE]
$flags[64]
$onlyIf[$hasPerms[$guildid;$authorId;manageguild]==true;{newEmbed:{description:$nonEscape[<:no:1314836229593759806>]  You don't have \`ManageGuild\` permission!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkPerms`
};
