#!/usr/bin/env node

const readline = require("readline");
const { program } = require("commander");
const dotenv = require("dotenv");
const getLyrics = require("./library/getLyrics");
const getSong = require("./library/getSong");

dotenv.config();

const apiKey ='SZ2FBOqVDvzzk7OAVIzD06a9nDPlbEV6qsVIMzzqFUHS9klnUBzsK3dXUvoMTV2E';
const version = "1.0.5"; 

program
  .command("lyrics <title> <artist>")
  .alias("l")
  .description("Get specified lyrics")
  .action((title, artist) => {
    const options = {
      apiKey,
      title,
      artist,
      optimize: true,
    };

    getLyrics(options).then((lyrics) => {
      console.log("\nLyrics:");
      console.log(lyrics);
    });
  });

program
  .command("song <title>")
  .alias("s")
  .description("Search for a song")
  .action((title, artist) => {
    const options = {
      apiKey,
      title,
      artist: artist || "",
      optimizeQuery: true,
    };

    getSong(options)
      .then((song) => {
        if (song) {
          console.log("\nSong Lyrics:");
          console.log(song.lyrics);
        } else {
          console.log("No song found.");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  });

program.addHelpCommand();

program
  .command("menu")
  .alias("m")
  .description("Show the menu")
  .action(() => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    console.log("Menu:");
    console.log("-------------------------------");
    console.log("| Option | Description             |");
    console.log("|--------|-------------------------|");
    console.log("|   1    | Search for specific lyrics |");
    console.log("|   2    | Search for a song         |");
    console.log("|   3    | About                     |");
    console.log("|   4    | Version                   |");
    console.log("|   5    | Exit                      |");
    console.log("-------------------------------");

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
          console.log(
            "Lyrics-Finder is a command-line tool for searching song lyrics."
          );
          console.log("Author: Kraken");
          console.log("Version: " + version);
          console.log("-------------------------------");
          rl.close();
          break;
        case "4":
          console.log("Version: " + version);
          rl.close();
          break;
        case "5":
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

program
  .command("version")
  .alias("v")
  .description("Show the version")
  .action(() => {
    console.log("Version: " + version);
  });

if (process.argv.length === 2) {
  console.log("Lyrics-Finder Command Line Tool");
  console.log("-------------------------------");
  console.log("Usage:");
  console.log("  lyrics   | l <title> <artist>   Get specified lyrics");
  console.log("  song     | s <title>              Search for a song");
  console.log("  menu     | m                     Show the menu");
  console.log("  version  | v                     Show the version");
  console.log("-------------------------------");
  console.log("Author: Kraken");
  console.log("Version: " + version);
  console.log("-------------------------------");
  console.log("-------------------------------");
} else {
  program.parse(process.argv);
}
