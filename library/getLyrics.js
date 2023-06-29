const searchSong = require('./searchSong');
const { checkOptions } = require('./utils');
const extractLyrics = require('./utils/extractLyrics');

/**
 * @param {({apiKey: string, title: string, artist: string, optimizeQuery: boolean}|string)} arg - options object, or Genius URL
 */
module.exports = async function (arg) {
  try {
    if (arg && typeof arg === 'string') {
      let lyrics = await extractLyrics(arg);
      return centerText(lyrics);
    } else if (typeof arg === 'object') {
      checkOptions(arg);
      let results = await searchSong(arg);
      if (!results || results.songs.length === 0) return null;
      let lyrics = await extractLyrics(results.songs[0].url);
      return centerText(lyrics);
    } else {
      throw 'Invalid argument';
    }
  } catch (e) {
    throw e;
  }
};

function centerText(text) {
  const lines = text.split('\n');
  const maxLength = lines.reduce((max, line) => Math.max(max, line.length), 0);

  const centeredLines = lines.map(line => {
    const paddingSize = Math.floor((maxLength - line.length) / 2);
    const padding = ' '.repeat(paddingSize);
    return padding + line + padding;
  });

  return centeredLines.join('\n');
}
