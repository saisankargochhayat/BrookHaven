<<<<<<< HEAD

=======
>>>>>>> de6f1810ece3cca1ebc1d1e1b6df68e5a1d43b62
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
