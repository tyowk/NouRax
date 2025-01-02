module.exports = {
    name: '247',
    description: 'Toggle 247 mode, the bot will not leave by itself',
    $if: 'old',
    code: `
$isInteraction
$description[Sorry but, this feature is not available now.]
$title[Coming Soon!]
$color[#4367FE]
$onlyIf[$hasPerms[$guildid;$authorId;manageguild]==true;{newEmbed:{description:$nonEscape[<:no:1314836229593759806>]  You don't have \`ManageGuild\` permission!}{color:Red}}{deleteIn:5s}{ephemeral}]
$checkPerms`,
};