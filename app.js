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
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
