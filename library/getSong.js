const searchSong = require('./searchSong');
const extractLyrics = require('./utils/extractLyrics');
const { checkOptions } = require('./utils');

/**
 * @param {{apiKey: string, title: string, artist: string, optimizeQuery: boolean}} options
 */
module.exports = async function (options) {
  try {
    checkOptions(options);
    let results = await searchSong(options);
    if (!results || results.songs.length === 0) return [];

    let songs = [];

    // Display search results in a table-like format
    console.log("Search Results:");
    console.log("-------------------------------");
    console.log("|  #  |     Title              &        Artist   |");
    console.log("-------------------------------");
    results.songs.forEach((song, index) => {
      console.log(`| ${index + 1}   | ${song.title.padEnd(20)} |`);
      songs.push({
        id: song.id,
        title: song.title,
        url: song.url,
        albumArt: song.albumArt,
        lyrics: null, 
      });
    });
    console.log("-------------------------------");

    if (results.related.length > 0) {
      console.log("Related Songs:");
      console.log("-------------------------------");
      results.related.forEach((song, index) => {
        console.log(`| ${index + 1}   | ${song.title.padEnd(20)} |`);
        songs.push({
          id: song.id,
          title: song.title,
          url: song.url,
          albumArt: song.albumArt,
          lyrics: null, 
        });
      });
      console.log("-------------------------------");
    }
    
    // Prompt user to select between song or related song
    const selectOption = await promptUser("Enter 's' for songs or 'r' for related songs: ");
    let selectedSong;
    if (selectOption.toLowerCase() === 's') {
      // Prompt user to select a song from the main search results
      const selectedSongIndex = await promptUser("Enter the number of the desired song from the main search results: ");
      selectedSong = results.songs[selectedSongIndex - 1];
    } else if (selectOption.toLowerCase() === 'r') {
      // Prompt user to select a song from the related songs
      const selectedSongIndex = await promptUser("Enter the number of the desired song from the related songs: ");
      selectedSong = results.related[selectedSongIndex - 1];
    } else {
      throw new Error("Invalid option selected.");
    }

    let lyrics = await extractLyrics(selectedSong.url);

    // Center align the lyrics
    let centeredLyrics = centerText(lyrics);

    return {
      id: selectedSong.id,
      title: selectedSong.title,
      url: selectedSong.url,
      lyrics: centeredLyrics,
      albumArt: selectedSong.albumArt
    };
  } catch (e) {
    throw e;
  }
};

function promptUser(question) {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer); 
    });
  });
}

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
