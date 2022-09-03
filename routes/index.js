var sanitizer = require("sanitizer");
var express = require("express");
var router = express.Router();
var db = require("../database");



var get_cookies = function (request) {
  var cookies = {};
  request.headers &&
    request.headers.cookie.split(";").forEach(function (cookie) {
      var parts = cookie.match(/(.*?)=(.*)$/);
      cookies[parts[1].trim()] = (parts[2] || "").trim();
    });
  return cookies;
};

router.get("", function (req, res, next) {
  var owner = sanitizer.sanitize(get_cookies(req)["owner"]);
  var sql = "SELECT * FROM users WHERE owner = " + owner + "";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("home", { Name: data[0].name, userData: data });
  });
});

router.get("/c", function (req, res, next) {
  res.cookie("owner", "1");
  res.send("sent");
});

module.exports = router;
