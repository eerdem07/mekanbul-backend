const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const db = require("./app_api/models/db");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const apiRouter = require("./app_api/routes/index");

const app = express();

app.use(cors({ origin: "*" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.options("*", (req, res) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://mekanbul-odev-1.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
