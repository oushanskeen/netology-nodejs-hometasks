//#!/usr/bin/env node

const readline = require("readline");
const input = readline.createInterface(process.stdin);
const http = require("http");

const weatherAPIKey = process.env.weatherAPIKey;

console.log(
  `
    Hello, dear curious! 
    Tell me please the name of city 
    you would like to get to.
  `
);

const theUrl = (_weather, _city) =>
  `http://api.weatherstack.com/current?access_key=${_weather}&query=${_city}`;

const procInput = (_city) => {
  http
    .get(theUrl(weatherAPIKey,_city), res => {
      res.setEncoding("utf-8");
      const statusCode = res.statusCode;
      let data = "";
      res.on("data", chunk => (data += chunk));
      res.on("end", () => {
        console.log("Come and get it!");
        console.log(JSON.parse(data).current);
      });
    })
    .on("error", e => {
      console.error(`Got error: ${e.message}`);
    });
};
input.on("line", data => procInput(data));
