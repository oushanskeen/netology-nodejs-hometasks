const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = lowdb(adapter);
const fs = require("fs");

const useState = initialState => {
  const x = initialValue;
  const state = () => x;
  const setState = newX => (x = newX);
  return [state, setState];
};

const imgUrl =
  "https://images.pexels.com/photos/1535422/pexels-photo-1535422.jpeg";
const baseUrl = "http://localhost:3030/api/books/";

const booksDb = {
  books: [
    { id: "1", content: "apples" },
    { id: "2", content: "bananas" },
    { id: "3", content: "cucumbers" }
  ]
};

db.defaults({ ...booksDb });
module.exports = app => {
  app.get("/api/books/:id/download", (req, res) => {
    const fileId = req.params.id;
    const directoryPath = /*__dirname*/ "./downloads";
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
  app.get("/api/books", (req, res) => {
    const x = db.get("books").value();
    res.json(x);
  });
  app.get("/api/books/:id", (req, res) => {
    const x = db
      .get("books")
      .find({ id: req.params.id })
      .value();
    x !== undefined
      ? res.json(x)
      : (() => {
          res.status(404);
          res.send("Not found!");
        })();
  });
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
  app.post("/api/books", (req, res) => {
    const dbBooks = db.get("books").value();
    const [lib, setLib] = useState(dbBooks);
    const newId = `${+dbBooks.slice(-1)[0].id + 1}`;
    const newBook = { id: newId, ...req.body };
    const newLib = [...dbBooks, { ...newBook }];
    setLib(newLib);
    res.send(newBook);
  });
  app.put("/api/books/:id", (req, res) => {
    const dbBooks = db.get("books").value();
    const [lib, setLib] = useState(dbBooks);
    const bookYouNeed = dbBooks.filter(e => e.id === req.params.id)[0];
    const newBook = { id: req.params.id, ...req.body };
    bookYouNeed === undefined
      ? (() => {
          res.status(404);
          res.send("Nothing to change!");
        })()
      : (() => {
          setLib([...dbBooks, newBook]);
          res.json(newBook);
        })();
  });
  app.delete("/api/books/:id", (req, res) => {
    const dbBooks = db.get("books").value();
    const [lib, setLib] = useState(dbBooks);
    const newLib = dbBooks.filter(e => e.id !== req.params.id);
    setLib(newLib);
    res.end("Ok");
  });
};
