module.exports = [{
    name: 'eval',
    aliases: ['e'],
    code: `$eval[$message]`
}, {
    name: 'djs',
    aliases: ['de'],
    code: `$djsEval[$message;true]`
}, {
    name: 'exec',
    code: `$exec[$message]`
}]