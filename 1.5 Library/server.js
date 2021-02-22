const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const router = express.Router();
const bodyParser = require("body-parser");

const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = lowdb(adapter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "./public")));

// db methods
const getBooks = () => db.get("books").value();
const postUser = payload =>
  db
    .get("users")
    .push({ ...payload })
    .write();
const getUser = id =>
  db
    .get("users")
    .find({ id: id })
    .value();
const getBook = id =>
  db
    .get("books")
    .find({ id: id })
    .value();
const addBook = book =>
  db
    .get("books")
    .push(book)
    .write();
const putBook = (id, payload) =>
  db
    .get("books")
    .find({ id: id })
    .assign({ content: payload })
    .write();
const deleteBook = id =>
  db
    .get("books")
    .remove({ id: id })
    .write();

// api calls
app.post("/api/user/login", (req, res) => {
  postUser(req.body);
  res.status(201).json(getUser(req.body.id));
});
app.get("/api/books", (req, res) => res.json(getBooks()));
app.get("/api/books/:id", (req, res) => {
  const book = getBook(req.params.id);
  book === undefined ? res.status(404).send("Not found!") : res.json(book);
});
app.post("/api/books", (req, res) => {
  const dbBooks = getBooks();
  const newId = `${+dbBooks.slice(-1)[0].id + 1}`;
  const newBook = { id: newId, ...req.body };
  const newLib = [...dbBooks, { ...newBook }];
  addBook(newBook);
  res.json(getBook(newId));
});
app.put("/api/books/:id", (req, res) => {
  const bookYouNeed = getBooks().filter(e => e.id === req.params.id)[0];
  const newBook = { id: req.params.id, ...req.body };
  putBook(req.params.id, req.body.content);
  bookYouNeed === undefined
    ? res.status(404).send("Nothing to change!")
    : res.json(getBook(req.params.id));
});
app.delete("/api/books/:id", (req, res) => {
  deleteBook(req.params.id);
  res.end("Ok");
});

const PORT = process.env.PORT || 3031;
http
  .createServer(app)
  .listen(PORT, () =>
    console.log(`Library server is started on port: ${PORT}.`)
  );
