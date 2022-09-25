var express = require("express");
var router = express.Router();

router.get("/like_button.js", function (req, res, next) {
  res.sendFile('C:/Users/Toaster/Documents/EgloCloud/js/like_button.js');
});



module.exports = router;