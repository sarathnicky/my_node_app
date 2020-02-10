var mysql = require('mysql')

// var connection = mysql.createConnection({
// 	 host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'nodejs'
// });

    var connection = mysql.createConnection({
        host: 'zintzotek.com',
        user: 'zintzotek1',
        password: 'realtek@2019',
        database: 'zintzote_nodejs'
    });
	
	/*var connection = mysql.createConnection({
	 host: 'remotemysql.com',
    user: 'UTTr1h1raL',
    password: 'XmLNj4q9of',
    database: 'UTTr1h1raL'
	});*/



connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


module.exports = connection;
