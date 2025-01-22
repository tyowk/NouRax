module.exports = {
    name: 'djseval',
    aliases: 'djs',
    private: true,
    code: `
$addButton[1;Delete;danger;delete]
$description[\`\`\`js
$textSlice[$replaceText[$if[$get[EVALED]==;null;$get[EVALED]];#SEMI#;];0;3992]\`\`\`]
$color[Orange]
$let[EVALED;$djseval[$message;true]]
$onlyIf[$isAuthorOwner==true;]`
};
