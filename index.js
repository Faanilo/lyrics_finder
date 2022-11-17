const getLyrics = require("./library/getLyrics");
const getSong = require("./library/getSong");
const options = {
  apiKey: "SZ2FBOqVDvzzk7OAVIzD06a9nDPlbEV6qsVIMzzqFUHS9klnUBzsK3dXUvoMTV2E",
  title: "talking to the moon",
  artist: "bruno mars",
  optimize: true,
};

getLyrics(options).then((lyrics) => console.log(lyrics));
getSong(options).then((song) => {
  console.log(`${song.lyrics}`);
});

