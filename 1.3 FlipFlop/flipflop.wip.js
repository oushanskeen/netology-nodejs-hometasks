const fs = require("fs");
const path = require("path");
const argv = process.argv;
const readline = require("readline");
const input = readline.createInterface(process.stdin);


const generateFlipflop = () => Date.now()%2 == 0 ? 1 : 2;
const dataFile = filename => path.join(__dirname, filename);

console.log("Орёл(1) или Решка(2) ?");

//const guess = generateFlipflop();
input.prompt();
input.on("line", data => {
  const situation = +data === guess ? "Win!" : "Lost!";
  //console.log(situation);
  //console.log("guess", guess);
  //const record = [guess, data, situation];
  const record = [generateFlipflop(), data, situation];
  const newDataObj = { ...data, [Date.now()]: record };
  fs.writeFile(dataFile, JSON.stringify(newDataObj), err =>
    console.log(err ? "err" : ":)")
  );
  console.log(`You ${situation}`);
  input.close();
});
