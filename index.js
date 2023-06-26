#!/usr/bin/env node

const readline = require("readline");
const { program } = require("commander");
const getLyrics = require("./library/getLyrics");
const getSong = require("./library/getSong");

program
  .command("lyrics <title> <artist>")
  .description("Get lyrics for a song")
  .action((title, artist) => {
    const options = {
      apiKey:
        "SZ2FBOqVDvzzk7OAVIzD06a9nDPlbEV6qsVIMzzqFUHS9klnUBzsK3dXUvoMTV2E",
      title,
      artist,
      optimize: true,
    };

    getLyrics(options).then((lyrics) => {
      console.log("Lyrics:");
      console.log(lyrics);
    });
  });

  program
  .command("song <title>")
  .description("Get a song")
  .action((title, artist) => {
    const options = {
      apiKey: "SZ2FBOqVDvzzk7OAVIzD06a9nDPlbEV6qsVIMzzqFUHS9klnUBzsK3dXUvoMTV2E",
      title,
      artist: artist || "", // Set empty string as the default value if "artist" is not provided
      optimizeQuery: true,
    };

    getSong(options).then((song) => {
      if (song) {
        console.log("Song Lyrics:");
        console.log(song.lyrics);
      } else {
        console.log("No song found.");
      }
    }).catch((error) => {
      console.error("An error occurred:", error);
    });
  });

program.addHelpCommand();

program.parse(process.argv);
