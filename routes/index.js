var express = require('express');
var router = express.Router();

console.log("working!");
var mysql = require('mysql')

/*var connection = mysql.createConnection({
        host: 'zintzotek.com',
        user: 'zintzotek1',
        password: 'realtek@2019',
        database: 'zintzote_nodejs'
    });
	
	
	connection.connect(function(err) {
    if (err) throw err;
    //console.log("Connected!");
});
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
