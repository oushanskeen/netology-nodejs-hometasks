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
  
app.post("/api/user/login",(req,res) => {
  console.log("post api user login");
  res.json({id:1,mail:"test@mail.ru"});
});
app.get("/api/books",(req,res) => {
  const x = db.get("books").value();
  res.json(x);
});
app.get("/api/books/:id",(req,res) => {
  const { id } = req.params;
  const book = db
    .get("books")
    .find({ id: id })
    .value();
  book === undefined
  ? (() => {
      res.status(404);
      res.send("Not found!");
    })()
  : res.json(book);
});
app.post("/api/books",(req,res) => {
  const dbBooks = db.get("books").value();
  const newId = `${+dbBooks.slice(-1)[0].id + 1}`;
  const newBook = { id: newId, ...req.body };
  const newLib = [...dbBooks, { ...newBook }];
    db.get("books")
      .push(newBook)
      .write();
    const dbBooksNew = db.get("books").value();
  res.json(newLib);
});
router.put("/api/books/:id",(req,res) => {
  const dbBooks = db.get("books").value();
  const bookYouNeed = dbBooks.filter(e => e.id === req.params.id)[0];
  const newBook = { id: req.params.id, ...req.body };
  db.get("books")
    .find({ id: req.params.id })
    .assign({ content: req.body.content })
    .write();
  bookYouNeed === undefined
    ? (() => {
        res.status(404);
        res.send("Nothing to change!");
      })()
    : (() => {
      res.json(newBook);
  })();
});
router.delete("/api/books/:id",(req,res) => {
  const dbBooks = db.get("books").value();
  db.get("books")
    .remove({ id: req.params.id })
    .write();
    res.end("Ok");
});


const PORT = process.env.PORT || 3031;
http
  .createServer(app)
  .listen(PORT, () => console.log(`Library server is started on port: ${PORT}.`));
