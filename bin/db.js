var mysql = require('mysql')
// var connection = mysql.createConnection({
	 // host: 'sql12.freemysqlhosting.net',
    // user: 'sql12295270',
    // password: 'zNVSSl3trZ',
    // database: 'sql12295270'
// });

/*var connection = mysql.createConnection({
	host: 'remotemysql.com',
    user: 'GXaBItTjvJ',
    password: 'MWN35ZbKmO',
    database: 'GXaBItTjvJ'
});*/


var connection = mysql.createConnection({
        host: 'zintzotek.com',
        user: 'zintzotek1',
        password: 'realtek@2019',
        database: 'zintzote_nodejs'
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