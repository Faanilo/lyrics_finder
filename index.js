#!/usr/bin/env node

const readline = require("readline");
const { program } = require("commander");
const getLyrics = require("./library/getLyrics");
const getSong = require("./library/getSong");

program
  .command("--lyrics <title> <artist>")
  .alias('-l')
  .description("Get specified lyrics")
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
  .command("--song <title>")
  .alias('-s')
  .description("Search for a song")
  .action((title, artist) => {
    const options = {
      apiKey:
        "SZ2FBOqVDvzzk7OAVIzD06a9nDPlbEV6qsVIMzzqFUHS9klnUBzsK3dXUvoMTV2E",
      title,
      artist: artist || "", 
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

program
  .command("--menu")
  .alias('-m')
  .description("Show the menu")
  .action(() => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("Welcome to the Command Line Tool menu!");
    console.log("1. Search for a specific lyrics");
    console.log("2. Search for a song");
    console.log("3. Exit");

    rl.question("Enter your choice: ", (choice) => {
      switch (choice) {
        case "1":
          rl.question("Enter the title of the song: ", (title) => {
            rl.question("Enter the artist: ", (artist) => {
              program.parse(["", "", "lyrics", title, artist]);
              rl.close();
            });
          });
          break;
        case "2":
          rl.question("Enter the title of the song: ", (title) => {
            program.parse(["", "", "song", title]);
            rl.close();
          });
          break;
        case "3":
          console.log("Exiting...");
          rl.close();
          break;
        default:
          console.log("Invalid choice. Please try again.");
          program.parse(["", "", "menu"]);
          rl.close();
      }
    });
  });

program.parse(process.argv);
