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
      apiKey: "SZ2FBOqVDvzzk7OAVIzD06a9nDPlbEV6qsVIMzzqFUHS9klnUBzsK3dXUvoMTV2E",
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
  .command("song <title> <artist>")
  .description("Get a song")
  .action((title, artist) => {
    const options = {
      apiKey: "SZ2FBOqVDvzzk7OAVIzD06a9nDPlbEV6qsVIMzzqFUHS9klnUBzsK3dXUvoMTV2E",
      title,
      artist,
      optimize: true,
    };

    getSong(options).then((song) => {
      console.log("Song Lyrics:");
      console.log(song.lyrics);
    });
  });

program.addHelpCommand();

program.parse(process.argv);
