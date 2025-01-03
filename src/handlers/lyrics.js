const
      fetch = require('node-fetch'),
      cheerio = require('cheerio'),
      clearRegex = /((\[|\()(?!.*?(remix|edit|remake)).*?(\]|\))|\/+|-+| x |,|"|video oficial|official lyric video| ft.?|\|+|yhlqmdlg|x100pre|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|\u274C)/g,
      clearRegex2 = /  +/g;

exports.GetLyrics = async (song) => {
    song = song
        .toLowerCase()
        .replace(clearRegex, '')
        .replace(clearRegex2, ' ')
        .trim();
    const html = await fetch(`https://www.google.com/search?q=${encodeURIComponent(song)}+lyrics&ie=UTF-8&tob=true`).then((x) => x.textConverted());
    const $ = cheerio.load(html);
    const
          lyrics = $('div[class="hwc"]')
              .find('div[class="BNeawe tAd8D AP7Wnd"]')
              .map((i, value) => {
                  return $(value);
              }), 
          nameStuff = $('span[class="BNeawe tAd8D AP7Wnd"]')?.text(),
          artistsStuff = $('span[class="BNeawe s3v9rd AP7Wnd"]').map((i, value) => {
        return $(value);
    }), sourceStuff = $('span[class="uEec3 AP7Wnd"]')?.text();
    if (!lyrics?.[0])
        return;
    
    return {
        title: nameStuff,
        artist: artistsStuff[1]?.text(),
        lyrics: lyrics[0]?.text(),
        source: sourceStuff,
    };
}
