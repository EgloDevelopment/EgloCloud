var express = require('express');
var router = express.Router();
var db=require('../database');
const cookieParser = require('cookie-parser')

var get_cookies = function(request) {
  var cookies = {};
  request.headers && request.headers.cookie.split(';').forEach(function(cookie) {
    var parts = cookie.match(/(.*?)=(.*)$/)
    cookies[ parts[1].trim() ] = (parts[2] || '').trim();
  });
  return cookies;
};
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('', function(req, res, next) {
    var owner = get_cookies(req)['owner']
    var sql='SELECT * FROM cloud WHERE owner = '+owner+'';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('cloud/cloud', { title: 'Cloud', userData: data});
  });
});


router.get('/c', function(req, res, next) {
  res.cookie("owner", "1");
  res.send("sent")
});


module.exports = router;