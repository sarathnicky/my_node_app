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



connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


module.exports = connection;