const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

require("./config/passport");

app.use("/auth", require("./routes/auth"));
app.use("/students", require("./routes/students"));
app.use("/interviews", require("./routes/interviews"));
app.use("/jobs", require("./routes/jobs"));
app.use("/dashboard", require("./routes/dashboard"));

app.get("/", (req, res) => res.render("index"));

module.exports = app;
