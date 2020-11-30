#!/usr/bin/env node
const readline = require("readline");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const input = readline.createInterface(process.stdin);
const argv = yargs(hideBin(process.argv)).argv;
console.log("yargs argv ", argv);
const helper = () => {
  const helperText = `
  loveyourtime helps you to track current time

  usage:
    loveyourtime <command>

    commands can be:

    current                : used to get current data and time in ISO format
    current --beautiful -b : used to get current data and time in ISO format
    current --year or -y   : used to show current year
    current --month or -m  : used to show current year
    current --date or -d   : used to show current date
    add <fraction> <num>   : used to show date <num> fractions ahead
    sub <fractions> <num>  : used to show date <num> fractions back

  `;
  console.log(helperText);
};

input.on("line", data => console.log(data));
input.on("close", () => console.log(""));
const commands = ["current", "add", "sub"];
const inputProc = () => {
  const date = new Date().toString().split(" ");
  switch (argv["_"][0]) {
    case "current":
      switch (process.argv[3]) {
        case "--year":
        case "-y":
          console.log(date[3]);
          input.close();
          return;
        case "--month":
        case "-m":
          console.log(date[1]);
          input.close();
          return;
        case "--date":
        case "-d":
          console.log(date[2]);
          input.close();
          return;
        case "--beautiful":
        case "-b":
          console.log(new Date().toString());
          input.close();
          return;
        default:
          console.log(new Date());
          input.close();
          return;
      }
    case "add":
      console.log(
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 1 + +process.argv[3]
        )
      );
      input.close();
      return;
    case "sub":
      console.log(
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 1 - +process.argv[3]
        )
      );
      input.close();
      return;
    default:
      helper();
      input.close();
  }
};
inputProc();
