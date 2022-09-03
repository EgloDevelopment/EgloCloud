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

router.get("/login", function (req, res, next) {
    res.render("users/login");
});

module.exports = router;
