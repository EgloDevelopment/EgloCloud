var sanitizer = require("sanitizer");
var db = require("../database");


module.exports = function (req, res, next) {
  var get_cookies = function (request) {
    var cookies = {};
    request.headers &&
      request.headers.cookie.split(";").forEach(function (cookie) {
        var parts = cookie.match(/(.*?)=(.*)$/);
        cookies[parts[1].trim()] = (parts[2] || "").trim();
      });
    return cookies;
  };
  const token = sanitizer.sanitize(get_cookies(req)["token"]);
  if (token && token.length >= 3) {
    next();
  } else res.redirect("/users/login");
};
