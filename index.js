#!/usr/bin/env node

const readline = require("readline");
const { program } = require("commander");
const getLyrics = require("./library/getLyrics");
const getSong = require("./library/getSong");
var figlet = require("figlet");


const apiKey =
  "SZ2FBOqVDvzzk7OAVIzD06a9nDPlbEV6qsVIMzzqFUHS9klnUBzsK3dXUvoMTV2E";
const version = "1.0.7";

const colorReset = "\x1b[0m";
const colorBright = "\x1b[1m";
const colorFgCyan = "\x1b[36m";
const colorFgYellow = "\x1b[33m";

figlet("finderrr", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  if (process.argv.length === 2) {
    console.log(colorFgCyan + data);
    console.log(colorBright + "Usage:");
    console.log("  lyrics   | l <title> <artist>   Get specified lyrics");
    console.log("  song     | s <keyword>          Search for a song");
    console.log("  menu     | m                    Show the menu");
    console.log("  version  | v                    Show the version");
    console.log("---------------------------");
    console.log("Author: Kraken");
    console.log("Version: " + version);
    console.log(colorReset);
  } else {
    program.parse(process.argv);
  }
});

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
      console.log(colorFgYellow + "\nLyrics :");
      console.log(lyrics);
      console.log(colorReset);
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
          console.log(colorFgYellow + "\nSong Lyrics:");
          console.log(song.lyrics);
          console.log(colorReset);
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
    console.log(colorBright + "Menu:");
    console.log("---------------------------");
    console.log("| Option | Description             |");
    console.log("|--------|-------------------------|");
    console.log("|   1    | Search for specific lyrics |");
    console.log("|   2    | Search for a song         |");
    console.log("|    3   | About                     |");
    console.log("|    4   | Version                   |");
    console.log("|    5   | Exit                      |");
    console.log("---------------------------");
    console.log(colorReset);

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
          console.log("---------------------------");
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
