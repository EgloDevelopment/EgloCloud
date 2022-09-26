const port = 3000;

var createError = require("http-errors");
var express = require("express");
//var session = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const rateLimit = require("express-rate-limit");

var indexRouter = require("./routes/index");
var stylesRouter = require("./routes/styles");

var app = express();

const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  handler: function (req, res /*next*/) {
    return res.status(429).json({
      error: "You sent too many requests. Please wait a while then try again",
    });
  },
});


// view engine setup
//app.use(apiRequestLimiter);
app.use("/", indexRouter);
app.use("/styles", stylesRouter);

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

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
  //res.cookie("token", "1");
  res.render("error");
});


app.listen(port, function () {
  console.log("info", "Server is running at port: " + port);
});



global.appRoot = path.resolve(__dirname);
module.exports = app;