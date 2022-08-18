var express = require('express');
var router = express.Router();
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('', function(req, res, next) {
    res.render("home", { name: 'Toaster'})
});

module.exports = router;