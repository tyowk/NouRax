module.exports = {
    name: 'exec',
    private: true,
    code: `
$addButton[1;Delete;danger;delete]
$description[\`\`\`js
$textSlice[$replaceText[$if[$get[EVALED]==;null;$get[EVALED]];#SEMI#;];0;3992]\`\`\`]
$color[Orange]
$let[EVALED;$exec[$replaceText[$message;--nodelete;]]]
$onlyIf[$isAuthorOwner==true;]`
};
