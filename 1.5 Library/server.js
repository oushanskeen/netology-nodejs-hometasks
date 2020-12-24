const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const booksRouter = require("./routes/books");
const userRouter = require("./routes/user");
const multer = require("multer");
//onst upload = multer({dest:"uploads/"});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use(express.static(path.join(__dirname, "./public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const imgUrl = "https://images.pexels.com/photos/1535422/pexels-photo-1535422.jpeg";

// set storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  }
});
const upload = multer({ storage: storage });

app.post("/uploadfile", upload.single("singleFile"),(req,res,next) => {
  const file = req.file;
  if (!file){
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error)
  }
  res.send(file);
});

booksRouter(app);
userRouter(app);
/*
app.use("/api/books", booksRouter);
app.use("/api/books/:id", booksRouter);
app.use("/api/user/login", userRouter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
*/
http
  .createServer(app)
  .listen(3030, () => console.log("Library server is started."));
