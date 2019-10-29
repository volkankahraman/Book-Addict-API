const express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({
    message: 'Kitap Bağımlısı API'
  });
});

module.exports = router;