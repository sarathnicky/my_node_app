var mysql = require('mysql')
var connection = mysql.createConnection({
	 host: 'https://databases.000webhost.com/',
    user: 'sarathnicky',
    password: 'ksk261294',
    database: 'nodejs'
});

/*var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs'
});*/

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


module.exports = connection;