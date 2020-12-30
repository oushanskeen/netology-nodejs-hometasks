const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const router = express.Router();
const bodyParser = require("body-parser");
const apiRouter = require("./routes/api");
const userRouter = require("./routes/user");
const multer = require("multer");
//onst upload = multer({dest:"uploads/"});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "./public")));
  
const books = ["book one","book two","book three","book four"]
/*
app.get("/index", (req, res) => {
  //res.render("index.ejs",{books:books});
  res.render("index.ejs",{books:books});
});
app.get("/view", (req, res) => {
  res.render("view.ejs",{book:"single book"});
});
*/
app.get("/create", (req, res) => {
  res.render("create.ejs");
});
app.get("/update", (req, res) => {
  res.render("update.ejs",{book:"book from outside"});
});
  
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

apiRouter(app);
userRouter(app);

router.use("/api", apiRouter);
/*
app.use("/api/books/:id", booksRouter);
app.use("/api/user/login", userRouter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
*/
const PORT = process.env.PORT || 3031;
http
  .createServer(app)
  .listen(PORT, () => console.log(`Library server is started on port: ${PORT}.`));
