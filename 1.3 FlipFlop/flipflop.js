const fs = require("fs");
const path = require("path");
const argv = process.argv;
const readline = require("readline");
const input = readline.createInterface(process.stdin);
//const db = require(`./${argv[2]}`);

const generateFlipflop = () => Date.now()%2 == 0 ? 1 : 2;
const dataFile = filename => path.join(__dirname, filename);

console.log("Орёл(1) или Решка(2) ?");

input.prompt();
input.on("line", data => {
  const filename = argv[2];
  fs.readFile(filename, "utf-8", (err, db) => {
    //err 
    // ? console.log("You need to create new file")
    // : console.log("Data from fs read file", db);
    const DB = db ? JSON.parse(db) : {};
    const guess = generateFlipflop();
    const situation = +data === guess ? "Win!" : "Lost!";
    const record = [guess, data, situation];
    const newDataObj = { ...DB, [Date.now()]: record };
  
    fs.writeFile(`./${argv[2]}`, JSON.stringify(newDataObj), err =>
      console.log(err ? "err" : ":)")
    );
    console.log(`You ${situation}`);
    input.close();
  });
});
