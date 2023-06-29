const axios = require('axios');
const { checkOptions, getTitle } = require('./utils');

const searchUrl = 'https://api.genius.com/search?q=';

/**
 * @param {{apiKey: string, title: string, artist: string, optimizeQuery: boolean, authHeader: boolean}} options
 */
module.exports = async function (options) {
  try {
    checkOptions(options);
    let { apiKey, title, artist, optimizeQuery = false, authHeader = false } = options;
    const song = optimizeQuery ? getTitle(title, artist) : `${title} ${artist}`;
    const reqUrl = `${searchUrl}${encodeURIComponent(song)}`;
    const headers = {
      Authorization: 'Bearer ' + apiKey
    };
    let { data } = await axios.get(
      authHeader ? reqUrl : `${reqUrl}&access_token=${apiKey}`,
      authHeader && { headers }
    );
    if (data.response.hits.length === 0) return null;

    const results = {
      songs: [],
      related: []
    };

    data.response.hits.forEach((val) => {
      const { full_title, song_art_image_url, id, url } = val.result;
      const songData = { id, title: full_title, albumArt: song_art_image_url, url };
      if (isMatch(title, full_title)) {
        results.songs.push(songData);
      } else {
        results.related.push(songData);
      }
    });

    return results;
  } catch (e) {
    throw e;
  }
};

function isMatch(searchTitle, fullTitle) {
  const searchWords = searchTitle.toLowerCase().split(' ');
  const fullTitleWords = fullTitle.toLowerCase().split(' ');

  for (const searchWord of searchWords) {
    let wordFound = false;
    for (const fullTitleWord of fullTitleWords) {
      if (fullTitleWord.includes(searchWord)) {
        wordFound = true;
        break;
      }
    }
    if (!wordFound) {
      return false;
    }
  }

  return true;
}
