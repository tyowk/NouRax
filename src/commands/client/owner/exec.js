module.exports = [
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
