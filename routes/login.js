var express = require('express');
var router = express.Router();
var db_con = require('../bin/db');

/* GET users listing. */
router.get('/session_login', function(req, res, next) {
  res.render('login', {title:'Login'});
});

router.post('/session_set', function(req, res, next) {
    //res.render('login', {title:'Login'});
     name = req.body.name;
     email = req.body.email;

     var sql = "select * from customers where name = '"+name+"' AND email= '"+email+"'";    
    console.log(sql);    
     db_con.connect(function(err) {
        
        db_con.query(sql, function (err, result, fields) {
          if (err) throw err;
          else res.send(result) 
          //if(result > 0){ res.send('Login');}  
          //else{res.send('Invalid Login');}
          
        });
    });

  });


module.exports = router;