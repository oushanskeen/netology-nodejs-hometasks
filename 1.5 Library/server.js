const express = require("express");
const app = express();
const http = require("http");
let bodyParser = require("body-parser");

const isString = x => (typeof x === "string" ? x : "stubString");
const bookModel = data => ({
  id: isString(data.id),
  title: isString(data.title),
  description: isString(data.description),
  authors: isString(data.authors),
  favorite: isString(data.favorite),
  fileCover: isString(data.fileCover),
  fileName: isString(data.fileName)
});
const books = [
  { id: "1", content: "apples" },
  { id: "2", content: "bananas" },
  { id: "3", conten: "cucumbers" }
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.get("/api/books", (req, res) => {
  res.json(books);
});
app.get("/api/books/:id", (req, res) => {
  const response = books.filter(e => e.id === req.params.id);
  response.length > 0
    ? res.json(response)
    : (() => {
        res.status(404);
        res.send("Not found!");
      })();
});
app.post("/api/books", (req, res) => {
  const newId = `${+books.slice(-1)[0].id + 1}`;
  const newLib = [...books, { id: newId, content: "pinetrees" }];
  res.send(newLib);
});
app.put("/api/books/:id", (req, res) => {
  const rest = books.filter(e => e.id !== req.params.id);
  res.length === books.length
    ? (() => {
        res.status(404);
        res.send("Nothing to change!");
      })()
    : (() => {
        res.json([...rest, req.body]);
      })();
});
console.log("BEFORE DELETE");
app.delete("/api/books/:id", (req, res) => {
  const newLib = books.filter(e => e.id !== req.params.id);
  res.end("Ok");
});
app.post("/api/user/login", (req, res) => {
  res.json({ id: 1, mail: "test@mail.ru" });
});

http
  .createServer(app)
  .listen(3030, () => console.log("Library server is started."));
