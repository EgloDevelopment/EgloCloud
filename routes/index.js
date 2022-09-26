var sanitizer = require("sanitizer");
const path = require("path");
var express = require("express");
var router = express.Router();
var db = require("../database");
var validate = require("../middleware/auth");
//const passport = require("passport");

var get_cookies = function (request) {
  var cookies = {};
  request.headers &&
    request.headers.cookie.split(";").forEach(function (cookie) {
      var parts = cookie.match(/(.*?)=(.*)$/);
      cookies[parts[1].trim()] = (parts[2] || "").trim();
    });
  return cookies;
};

router.get("", validate, function (req, res, next) {
  var token = sanitizer.sanitize(get_cookies(req)["token"]);
  var sql = "SELECT * FROM users WHERE token = " + token + "";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("home", { Name: data[0].name, userData: data });
  });
});

//------------------------------------------TESTING----------------------------------------//

router.get("/c", function (req, res, next) {
  res.cookie("token", "123");
  res.send("sent");
});

router.get("/loading", function (req, res, next) {
  res.render("loading");
});

router.get("/error", function (req, res, next) {
  res.render("error");
});

//-----------------------------FOR THOSE WHO THINK THEY ARE HACKERMANS---------------------------//

router.get("/register/:promo", function (req, res, next) {
  res.redirect("/users/register/" + req.params.promo);
});

router.get("/login", function (req, res, next) {
  res.redirect("/users/login");
});

module.exports = router;
