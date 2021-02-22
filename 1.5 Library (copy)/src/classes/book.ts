const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = lowdb(adapter);
const http = require("http");
const fs = require("fs");

const isCallToApi = requestString => Boolean(requestString.match(/api/gi));

class BooksRepository {
  createBook = (book) => db.get("books").push(newBook).write();
  getBook = (id) => db.get("books").find({ id: id }).value();
  getBooks = () => db.get("books").value();
  updateBook = (id,newValue) => db.set(`books.${id}`, newValue).write();
  deleteBook = (id) => db.get("books").remove({ id: id }).write();
}
const downloadBook = (req, res) => {
  const fileId = req.params.id;
  const directoryPath = /*__dirname*/ "./downloads";
  res.download(
    directoryPath + `/book${fileId}.txt`,
    `book${fileId}.txt`,
    err => {
      err
        ? res.status(500).send({ message: "Could not download the file" + err })
        : res.send("File is successfully transfered.");
    }
  );
};
const getBooks = (req, res) => {
  const x = BooksRepository.getBooks()
  isCallToApi(req.url) ? res.json(x) : res.render("index.ejs", { books: x });
};
const getBook = (req, res) => {
  http.get("http://localhost:3032/counter/1", (creq, cres) => {
    const { id } = req.params;
    const bookb = BooksRepository.getBook(id);
    book !== undefined
      ? isCallToApi(req.url)
        ? res.json([book, cres])
        : res.render("view.ejs", { book: book, count: cres })
      : (() => {
          res.status(404);
          res.send("Not found!");
        })();
  });
};
const createBook = (req, res) => {
  const dbBooks = BooksRepository.getBooks();
  console.log("On Post request books: ", dbBooks);
  const newId = `${+dbBooks.slice(-1)[0].id + 1}`;
  const newBook = { id: newId, ...req.body };
  const newLib = [...dbBooks, { ...newBook }];
  BooksRepository.createBook(newBook);
  const dbBooksNew = BooksRepository.getBooks();
  res.render("view.ejs", { book: newBook });
};
const updateBook = (req, res) => {
  const bookYouNeed = BooksRepository.updateBook(req.params.id);
  const newBook = { id: req.params.id, ...req.body };
  //db.get("books");
  bookYouNeed === undefined
    ? (() => {
        res.status(404);
        res.send("Nothing to change!")
      })()
    : (() => {
        res.json(newBook);
      })();
};
/*
Методы, которые должны быть в BooksRepository
    createBook(book){} - создание книги
    getBook(id){} - получение книги по id
    getBooks(){} - получение всех книг
    updateBook(id){} - обновление книги
    deleteBook(id){} - удаление книги
*/
const deleteBook = (req, res) => {
  BooksRepository.deleteBook(req.params.id);
  res.end("Ok");
};
module.exports = app => {
  app.get("/api/books/:id/download", downloadBook);
  app.get("(/api)?/books", getBooks);
  app.get("(/api)?/books/:id", getBook);
  app.post("(/api)?/books", getBooksTwo);
  app.put("/api/books(/:id)?", getBookTwo);
  app.delete("/api/books/:id", deleteBook);
};jkk
