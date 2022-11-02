require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var jobsRouter = require("./routes/jobs");
var teamsRouter = require("./routes/teams");

var app = express();
let cors_whitelist =
  process.env["NODE_ENV"] === "production"
    ? [
        "http://10.155.127.195",
        "http://10.155.127.197",
        "http://10.84.167.42",
        "http://10.84.167.77",
        "http://localhost:3001",
        "http://jenkinsmonitor.meridium.com/",
      ]
    : ["http://localhost:3000"];

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (cors_whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/teams", teamsRouter);
app.use("/jobs", jobsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
