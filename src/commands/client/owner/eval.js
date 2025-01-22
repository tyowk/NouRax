module.exports = [
    {
        name: 'eval',
        private: true,
        code: `
$addButton[1;Delete;danger;delete]
$description[\`\`\`js
$textSlice[$replaceText[$if[$get[EVALED]==;null;$get[EVALED]];#SEMI#;];0;3992]\`\`\`]
$color[Orange]
$let[EVALED;$eval[$message;true;true;true;true]]
$onlyIf[$isAuthorOwner==true;]`
    },
    {
        name: 'delete',
        type: 'interaction',
        prototype: 'button',
        code: `
$deletecommand
$onlyIf[$isAuthorOwner==true;]`
    }
];
