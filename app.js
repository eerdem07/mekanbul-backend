const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

require("dotenv").config();

const db = require("./app_api/models/db");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const apiRouter = require("./app_api/routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
