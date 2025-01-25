module.exports = {
    name: 'help',
    aliases: ['command', 'commands', 'h', 'cmd', 'cmds'],
    description: 'See all my available commands',
    params: ['[command]'],
    cooldown: '3s',
    options: [
        {
            name: 'command',
            description: 'What to learn about?',
            type: 3,
            required: false
        }
    ],
    $if: 'old',
    code: `
$isInteraction
$if[$getContext[command;1]==]
$image[https://cdn.noujs.my.id/guild/transparent.png]
$description[**:wave:  Hello! I'm Rax!**  
I'm a discord music bot, here to bring music to your server! My prefix is **\`nou\`**.  

$getEmoji[bdot] **Need Help?**  
Join our [Support Server](https://discord.gg/hyQYXcVnmZ) for assistance, feedback, or suggestions.  

$getEmoji[bdot] **Important:**  
By using and interacting with me, you agree to our **Terms of Service**. Type **\`/terms\`** to learn more.  

**Let’s enjoy great music together!**]
$addField[$getEmoji[bdot]  UTILITIES;\`help\`  \`info\`  \`invite\`  \`node\`  \`ping\`  \`prefix\`  \`privacy\`  \`support\`  \`terms\`  \`247\`]
$addField[$getEmoji[bdot]  FILTERS;\`8d\`  \`bass\`  \`chimpunk\`  \`china\`  \`clearfilter\`  \`darthvader\`  \`daycore\`  \`doubletime\`  \`earrape\`  \`electronic\`  \`equalizer\`  \`karaoke\`  \`nightcore\`  \`party\`  \`pitch\`  \`pop\`  \`radio\`  \`rate\`  \`slow\`  \`soft\`  \`speed\`  \`treblebass\`  \`tremolo\`  \`vaporwave\`  \`vibrato\`]
$addField[$getEmoji[bdot]  MUSIC;\`autoplay\`  \`clearhistory\`  \`clearqueue\`  \`connect\`  \`disconnect\`  \`grab\`  \`history\`  \`loop\`  \`lyrics\`  \`move\`  \`nowplaying\`  \`pause\`  \`play\`  \`previous\`  \`queue\`  \`remove\`  \`replay\`  \`resume\`  \`search\`  \`seek\`  \`shuffle\`  \`skip\`  \`skipto\`  \`stop\`  \`unshuffle\`  \`volume\`]
$footer[Requested by $username;$authorAvatar]
$color[#4367FE]
$addButton[1;Support;link;https://discord.gg/hyQYXcVnmZ;false;$getEmoji[discord]]
$addButton[1;Invite;link;https://discord.com/oauth2/authorize?client_id=1297801416848441386&permissions=34949376&scope=bot%20applications.commands;false;$getEmoji[link]]
$elseif[$commandInfo[$toLowerCase[$getContext[command;1]];name]==||$commandInfo[$toLowerCase[$getContext[command;1]];private]==true]
$description[$getEmoji[no]  Uh oh... command not found!]
$color[Red]
$deleteIn[5s]
$flags[64]
$endelseif
$else
$title[$getEmoji[sparkles]   $commandInfo[$toLowerCase[$getContext[command;1]];name + ' ' + (cmd?.params ? cmd?.params?.join(' ') : '')]]
$color[#4367FE]
$description[$commandInfo[$toLowerCase[$getContext[command;1]];description ? cmd?.description : 'No description provided']]
$addField[Aliases;$commandInfo[$toLowerCase[$getContext[command;1]];aliases?.length > 0 ? (Array.isArray(cmd.aliases) ? cmd.aliases.map(alias => '$getEmoji[bdot] \`' + alias + '\`').join('\\n') : '$getEmoji[bdot] \`' + cmd?.aliases + '\`') : '$getEmoji[bdot] none']]
$addField[Cooldown;$commandInfo[$toLowerCase[$getContext[command;1]];cooldown ? '$getEmoji[bdot] ' + cmd.cooldown : '$getEmoji[bdot] No cooldown']]
$footer[<>  ➜  required\n[]  ➜ optional]
$endif
$checkPerms
`
};
