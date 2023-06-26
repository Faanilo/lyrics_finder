const readline = require("readline");
const getLyrics = require("./library/getLyrics");
const getSong = require("./library/getSong");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const options = {
  apiKey: "SZ2FBOqVDvzzk7OAVIzD06a9nDPlbEV6qsVIMzzqFUHS9klnUBzsK3dXUvoMTV2E",
  title: "",
  artist: "",
  optimize: true,
};

rl.question("Enter the title of the song: ", (title) => {
  options.title = title;

  rl.question("Enter the artist: ", (artist) => {
    options.artist = artist;

    rl.close();

    // Fetch lyrics
    getLyrics(options).then((lyrics) => {
      console.log("Lyrics:");
      console.log(lyrics);
    });

    // Fetch song
    getSong(options).then((song) => {
      console.log("Song Lyrics:");
      console.log(song.lyrics);
    });
  });
});
