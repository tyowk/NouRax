module.exports = [
    {
        name: 'trackEnd',
        type: 'trackEnd',
        code: `
$deleteNowPlaying
$onlyIf[$channelExists[$channelId]==true;]`,
    },
];
