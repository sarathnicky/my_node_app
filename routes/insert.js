var express = require('express');
var router = express.Router();
var db_con = require('../bin/db');

/* GET users listing. */
router.post('/insert_data', function(req, res, next) {
  
  var sql = "INSERT INTO customers (name, email) VALUES (?, ?)";
  db_con.query(sql, [req.body.name, req.body.email], function (err, result) {
    if (err) throw err;    
    else res.render('show', { title: 'Express' });
});
});

router.get('/update/:id', function(req, res, next) {
    
    id =req.params.id;
    db_con.connect(function(err) {
        
        db_con.query("SELECT * FROM customers where id ="+id, function (err, result, fields) {
          if (err) throw err;
          
          else res.render('update', { title: 'Express', name: result[0].name, email: result[0].email, id: result[0].id });
          
        });
        //db_con.end();
    });

    
  });

router.get('/show_data_view', function(req, res, next) {
    
    res.render('show', { title: 'Express' });
    });

router.get('/show_data', function(req, res, next) {
    
    db_con.connect(function(err) {
        
        db_con.query("SELECT * FROM customers", function (err, result, fields) {
          if (err) throw err;
          else res.send(result);
          
        });
        //db_con.end();
    });

    
  });


  router.post('/update_data/:id', function(req, res, next) {
    
    id =req.params.id;
    var sql = "UPDATE customers SET name = '"+req.body.name+"' ,email= '"+req.body.email+"' WHERE id = "+id;    
    db_con.query(sql, function (err, result) {
      if (err) throw err;
      else res.render('show', { title: 'Express' });
      
  });
  });

  router.get('/delete/:id', function(req, res, next) {
    
    id =req.params.id;
    var sql = "delete from customers WHERE id = "+id;    
    db_con.query(sql, function (err, result) {
      if (err) throw err;
      else res.render('show', { title: 'Express' });
      
  });
  });

module.exports = router;