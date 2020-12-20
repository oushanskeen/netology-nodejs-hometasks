const fs = require("fs");
const path = require("path");
const dataFile = path.join(__dirname, "flipFlopData");

export const generateFlipflop = () => +Math.ceil(Math.random() * 2);
describe("flip flop generator", () => {
  const num = generateFlipflop();
  it("generates 1 or 2", () => {
    expect(num).toBeGreaterThan(0);
  });
  it("generates 1 or 2", () => {
    expect(num).toBeGreaterThan(0);
  });
});

export const makeSet = (_guess, _flipflop) => fs.writeFile(dataFile,JSON.stringify([
  _guess,
  _flipflop,
  _guess === _flipflop ? "win" : "lost"
]), (err) => console.log(err?"err":"ok");
describe("set ", () => {
  it("given guess and flip flop it returns it packed", () => {
    const guessess = [1, 2, 2, 1];
    const flipFlops = [1, 2, 1, 2];
    expect(makeSet(guessess[0], flipFlops[0])).toEqual([1, 1, "win"]);
    expect(makeSet(guessess[1], flipFlops[1])).toEqual([2, 2, "win"]);
    expect(makeSet(guessess[2], flipFlops[2])).toEqual([2, 1, "lost"]);
    expect(makeSet(guessess[3], flipFlops[3])).toEqual([1, 2, "lost"]);
  });
});
const log = [
  [1, 1, "win"],
  [2, 2, "win"],
  [2, 1, "lost"],
  [1, 2, "lost"]
];
export const allTries = _tries => _tries.length;
export const winsAndLoses = _tries => [
  _tries.filter(e => e[2] === "win").length,
  _tries.filter(e => e[2] === "lost").length
];
export const winsPercent = (_tries) => 
  100/(_tries.length) * winsAndLoses(_tries)[0];
describe("all tries", () => {
  it("shows all", () => {
    expect(allTries(log)).toEqual(4);
  });
  it("shows wins and loses", () => {
    expect(winsAndLoses(log)).toEqual([2, 2]);
  });
  it("shows percent of wins", () => {
    expect(winsPercent(log)).toEqual(50);
  });
});
