#!/usr/bin/env node
const readline = require("readline");
const input = readline.createInterface(process.stdin);
const argv = process.argv;

console.log("Загадано число от 0 до 100");
const randomNum = Math.floor(Math.random() * 100);
input.prompt();
input.on("line", data => {
  console.log(
    data == randomNum
      ? (() => {
          console.log(`Отгадано число ${randomNum}`);
          input.close();
          return "";
        })()
      : data > randomNum
      ? "Меньше"
      : "Больше"
  );
});
