module.exports = [
    {
        name: 'eval',
        code: `
$description[\`\`\`js
$textSlice[$replaceText[$if[$get[EVALED]==;null;$get[EVALED]];#SEMI#;];0;3992]\`\`\`]
$color[Orange]
$let[EVALED;$eval[$message;true;true;true;true]]
$onlyIf[$checkClientOwnerIds==true;]`,
    },
    {
        name: 'djseval',
        aliases: 'djs',
        code: `
$description[\`\`\`js
$textSlice[$replaceText[$if[$get[EVALED]==;null;$get[EVALED]];#SEMI#;];0;3992]\`\`\`]
$color[Orange]
$let[EVALED;$djseval[$message;true]]
$onlyIf[$checkClientOwnerIds==true;]`,
    },
    {
        name: 'exec',
        code: `
$description[\`\`\`js
$textSlice[$replaceText[$if[$get[EVALED]==;null;$get[EVALED]];#SEMI#;];0;3992]\`\`\`]
$color[Orange]
$let[EVALED;$exec[$message]]
$onlyIf[$checkClientOwnerIds==true;]`,
    },
];
