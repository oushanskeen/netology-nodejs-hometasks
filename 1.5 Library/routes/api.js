const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = lowdb(adapter);
const http = require("http");
const fs = require("fs");
const router = express.Router();

/*const baseUrl = "http://localhost:3030/api/books/";*/
/*const booksDb = {
  books: [
    { id: "1", content: "apples" },
    { id: "2", content: "bananas" },
    { id: "3", content: "cucumbers" }
  ]
};*/
//const isCallToApi = requestString => Boolean(requestString.match(/api/gi));
//db.defaults({ ...booksDb });
module.exports = app => {
  //router.g("/",(req,res) => res.json("hello from api"));
  /*
  app.get("/books/:id/download", (req, res) => {
    const fileId = req.params.id;
    const directoryPath =__dirname "./downloads";
    //console.log("CURRENT DIR PATH: ", directoryPath);
    //console.log("ID ON DOWNLOAD REQUEST: ", req.params.id);
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
  */
  router.get("/books", (req, res) => {
    console.log(req.url);
    const x = db.get("books").value();
    isCallToApi(req.url) ? res.json(x) : res.render("index.ejs", { books: x });
  });
  router.get("/books/:id", (req, res) => {
    console.log("ON GET ONE: ", req.url);
    http.get("http://localhost:3032/counter/1", (creq, cres) => {
      //console.log("cOunter response: ", cres);
      const { id } = req.params;
      const book = db
        .get("books")
        .find({ id: id })
        .value();
      console.log("books inside id book request: ", book);
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
  /*
  app.get(imgUrl, (req, res) => {
    const fileStream = fs.createWriteStream("firstTry.jpeg");
    res.pipe(fileStream);
    fileStreaam.on("finish", () => {
      fileStream.close();
      console.log("Writing file finished");
    });
    console.log("ID ON DOWNLOAD REQUEST: ", req.params.id);
    res.end();
  });
  */
  router.post("/books", (req, res) => {
    const dbBooks = db.get("books").value();
    console.log("On Post request books: ", dbBooks);
    const newId = `${+dbBooks.slice(-1)[0].id + 1}`;
    const newBook = { id: newId, ...req.body };
    const newLib = [...dbBooks, { ...newBook }];
    db.get("books")
      .push(newBook)
      .write();
    const dbBooksNew = db.get("books").value();
    //console.log("NEW LOG: ", dbBooksNew);
    //isCallToApi(req.url)
    //res.send(newBook)
    res.render("view.ejs", { book: newBook });
  });
  router.put("/books/:id", (req, res) => {
    //console.log("PUT STARTED");
    const dbBooks = db.get("books").value();
    const bookYouNeed = dbBooks.filter(e => e.id === req.params.id)[0];
    const newBook = { id: req.params.id, ...req.body };
    db.get("books")
      .find({ id: req.params.id })
      .assign({ content: req.body.content })
      .write();
    console.log(db.get("books").value());
    bookYouNeed === undefined
      ? (() => {
          res.status(404);
          res.send("Nothing to change!");
        })()
      : (() => {
          res.json(newBook);
        })();
  });
  router.delete("/books/:id", (req, res) => {
    const dbBooks = db.get("books").value();
    db.get("books")
      .remove({ id: req.params.id })
      .write();
    //const newLib = dbBooks.filter(e => e.id !== req.params.id);
    //console.log("NEW DB AFTER DELETE");
    //console.log(db.get("books"))
    res.end("Ok");
  });
});
module.exports = router;
