var express = require('express');
var router = express.Router();

router.get('/user/:username', function(req, res, next) {
  res.json({
    user: req.params.username,
  });
});

module.exports = router;