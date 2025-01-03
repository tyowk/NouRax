exports.GetLyrics = async song => {
    song = song
        .toLowerCase()
        .replace(
            /((\[|\()(?!.*?(remix|edit|remake)).*?(\]|\))|\/+|-+| x |,|"|video oficial|official lyric video| ft.?|\|+|yhlqmdlg|x100pre|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|\u274C)/g,
            '',
        )
        .replace(/  +/g, ' ')
        .trim();

    const html = await require('node-fetch')(
        `https://www.google.com/search?q=${encodeURIComponent(song)}+lyrics&ie=UTF-8&tob=true`,
    ).then(x => x.textConverted());

    const $ = require('cheerio').load(html);

    const lyrics = $('div[class="hwc"]')
        .find('div[class="BNeawe tAd8D AP7Wnd"]')
        .map((i, value) => $(value))
        .get();

    const title = $('span[class="BNeawe tAd8D AP7Wnd"]')?.text();
    const artist = $('span[class="BNeawe s3v9rd AP7Wnd"]')
        .map((i, value) => $(value))
        .get();

    const source = $('span[class="uEec3 AP7Wnd"]')?.text();

    if (!lyrics?.[0]) return;

    return {
        query: song,
        title,
        artist: artist[1]?.text(),
        lyrics: lyrics[0]?.text(),
        source,
    };
};
