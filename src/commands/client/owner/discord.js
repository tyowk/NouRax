module.exports = [
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
];
