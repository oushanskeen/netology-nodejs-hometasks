const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = lowdb(adapter);
const http = require("http");
const fs = require("fs");

const isCallToApi = requestString => Boolean(requestString.match(/api/gi));

module.exports = app => {
  app.get("/api/books/:id/download", (req, res) => {
    const fileId = req.params.id;
    const directoryPath = /*__dirname*/ "./downloads";
    res.download(
      directoryPath + `/book${fileId}.txt`,
      `book${fileId}.txt`,
      err => {
        err
          ? res
              .status(500)
              .send({ message: "Could not download the file" + err })
          : res.send("File is successfully transfered.");
      }
    );
  });
  app.get("(/api)?/books", (req, res) => {
    const x = db.get("books").value();
    isCallToApi(req.url) 
      ? res.json(x) 
      : res.render("index.ejs", { books: x });
  });
  app.get("(/api)?/books/:id", (req, res) => {
    http.get("http://localhost:3032/counter/1", (creq, cres) => {
      const { id } = req.params;
      const book = db
        .get("books")
        .find({ id: id })
        .value();
      book !== undefined
        ? isCallToApi(req.url)
          ? res.json([book, cres])
          : res.render("view.ejs", { book: book, count: cres })
        : (() => {
            res.status(404);
            res.send("Not found!");
          })();
    });
  });
  app.post("(/api)?/books", (req, res) => {
    const dbBooks = db.get("books").value();
    console.log("On Post request books: ", dbBooks);
    const newId = `${+dbBooks.slice(-1)[0].id + 1}`;
    const newBook = { id: newId, ...req.body };
    const newLib = [...dbBooks, { ...newBook }];
    db.get("books")
      .push(newBook)
      .write();
    const dbBooksNew = db.get("books").value();
    res.render("view.ejs", { book: newBook });
  });
  app.put("/api/books(/:id)?", (req, res) => {
    console.log("PUT STARTED");
    const dbBooks = db.get("books").value();
    const bookYouNeed = dbBooks.filter(e => e.id === req.params.id)[0];
    const newBook = { id: req.params.id, ...req.body };
    db.get("books")
    bookYouNeed === undefined
      ? (() => {
          res.status(404);
          res.send("Nothing to change!");
        })()
      : (() => {
          res.json(newBook);
        })();
  });
  app.delete("/api/books/:id", (req, res) => {
    const dbBooks = db.get("books").value();
    db.get("books")
      .remove({ id: req.params.id })
      .write();
    res.end("Ok");
  });
};
