var express = require('express');
var router = express.Router();
var db_con = require('../bin/db');
const bcrypt = require('bcryptjs');
//const asyncHandler = require('express-async-handler');

function testing2(pass) {
  const promisetoken =  new Promise((resolve, reject) => {
    bcrypt.hash(pass, 10, function(err, hash){
      resolve(hash);
    });
  });
  return promisetoken;
}


function password_encrytion(pass) {
  const promisetoken =  new Promise((resolve, reject) => {
    bcrypt.hash(pass, 10, function(err, hash){
      resolve(hash);
    });
  });
  return promisetoken;
}

function verify_password(passwordEnteredByUser, hash) {
  const verify_password =  new Promise((resolve, reject) => {
    bcrypt.compare(passwordEnteredByUser, hash, function(err, isMatch) {      
      if (!isMatch) {
        resolve("not_match");
    } else {
      resolve("match");
    }
  });
  });
  return verify_password;
}

router.get('/testing', async (req, res) => {  
  const newwssss = await testing2('ksk261294')
  console.log(newwssss);
})

router.post('/game_type', function(req, res, next) {
  game_type = req.body.game_type;
  if(game_type == 1)
  {
    var sql = "select 100000 + id as table_id, activate_player, table_status, 1 as game_type from andar_bahar_game where table_status IN ('open', 'registering')";

      db_con.connect(function(err) {
        
      db_con.query(sql, function (err, result, fields) {

        if (err)
        res.send(JSON.stringify({"error": err}));
        if(result != '')
        {
          res.send(JSON.stringify({"response": result,"message":'Table List',"status": 200}));
        }
        else
        {
          res.send(JSON.stringify({"status": 400, "message":'Dont Have Table'}));
        }
        
      });
     });
  }
});


router.post('/player_details', function(req, res, next) {

    player_id = req.body.player_id;

    var sql = "select id as player_id, chips as player_chips from users where id = "+player_id+"";

      db_con.connect(function(err) {
        
      db_con.query(sql, function (err, result, fields) {

        if (err)
        res.send(JSON.stringify({"error": err}));
        if(result != '')
        {
          res.send(JSON.stringify({"response": result,"message":'Player Details',"status": 200}));
        }
        else
        {
          res.send(JSON.stringify({"status": 400, "message":'Dont Have Player Details'}));
        }
        
      });
     });
});

/* old function code
router.post('/sign_up', function(req, res, next) {*/
router.post('/sign_up', async(req, res) => {

    mobile = req.body.mobile;
    email = req.body.email;
    username = req.body.username;
    const password = await password_encrytion(req.body.password)
    
    
    var sql1 = "select id from users where mobileno = '"+mobile+"'";

    db_con.query(sql1, function (error, results1, fields) {

      if(results1!='')
      {
        res.send(JSON.stringify({"message": 'MobileNo Already Exits', "status": 400}));
      }
      else
      {
        var sql2 = "select id from users where email = '"+email+"'";

        db_con.query(sql2, function (error, results2, fields) {

          if(results2!='')
          {
          res.send(JSON.stringify({"message": 'Email ID Already Exits', "status": 400}));
          }
          else
          {
            var sql3 = "select id from users where username = '"+username+"'";

            db_con.query(sql3, function (error, results3, fields) {

            if(results3!='')
            {
            res.send(JSON.stringify({"message": 'UserName Already Exits', "status": 400}));
            }
            else
            {
              /*login insert*/
                              var sql = "INSERT INTO users(username, email, mobileno, password) VALUES ('"+username+"', '"+email+"', '"+mobile+"', '"+password+"')";

                              db_con.connect(function(err) {

                              db_con.query(sql, function (err, result, fields) {

                                if (err)
                                   res.send(JSON.stringify({"error": err}));
                                  if(result != '')
                                  {
                                    res.send(JSON.stringify({"message": 'Sign Up Success', "status": 200}));
                                  }
                                  else
                                  {
                                    res.send(JSON.stringify({"status": 400}));
                                  }

                              });

                              });

            /*login insert*/


            }
            });
          }

        });
      }

    });

});


router.post('/login', function(req, res, next) {

    username = req.body.username;
    password = req.body.password;
    
    var sql = "select id as user_id, username,chips, password from users where username = '"+username+"' limit 1";
    
     db_con.connect(function(err) {
        
        db_con.query(sql, async (err, result, fields) =>{

          if (err)
          res.send(JSON.stringify({"error": err}));
          if(result != '')
          {
            hash_password = result[0].password;
            const verify_password_check = await verify_password(password, hash_password);
            if(verify_password_check == 'match')
            {
              res.send(JSON.stringify({"response": result,"message":'Login Successfully',"status": 200}));
            } 
            else
            {
              res.send(JSON.stringify({"status": 400, "message":'Invalid Username and Password'}));  
            }           
            
          }
          else
          {
            res.send(JSON.stringify({"status": 400, "message":'Invalid Username and Password'}));
          }
          
        });
    });
    
  });

  function shuffle(arra1) {

    var ctr = arra1.length, temp, index;

    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
  
  return arra1;
    
}


var sending_count = 0;

function start_game_timer()
{
const games =  new Promise((resolve, reject) => {

  var counter = 30;
    var interval = setInterval(function() {
    counter--;
    
    if (counter <= 0) {
         clearInterval(interval);
         sending_count = counter;
         resolve(sending_count);
    }else{    	
      sending_count = counter;
      resolve(sending_count);    
    }        
}, 1000);

});

  return games;

}

function running_time(req, res, next) {

  const running_time =  new Promise((resolve, reject) => {
    resolve(sending_count);
  });

  return running_time;
    
}

var result_card_count = 0;
function set_result_card()
{
  const set_result_card =  new Promise((resolve, reject) => {

  arr = new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51);
  result_card = arr[Math.floor(Math.random() * arr.length)];
  result_card_count = result_card;
  resolve(result_card_count);
  });

  return set_result_card;

}

function get_result_card()
{
  const get_result_card =  new Promise((resolve, reject) => {
    resolve(result_card_count);
  });

  return get_result_card;
}

router.post('/second_bet_game', async(req, res) => {
  
  player_id = req.body.player_id;
  table_id = req.body.table_id;
  game_type = req.body.game_type;    
  bet_amount = req.body.bet_amount;
  bet_type = req.body.bet_type;

  result = {};
  
  result['ten_card'] = balance_shuffle_card;    
  result['player_id'] = player_id;    
  result['table_id'] = table_id;    
  result['game_type'] = game_type;    
  result['bet_type'] = bet_type;        
  result['bet_amount'] = bet_amount;

  results = new Array(result);

  res.send(JSON.stringify({"response": results,"message":'Shuffle Card',"status": 200}));

  //var sql4 = "select * from game_play where table_id = "+table_id+" AND player_id = "+player_id+" AND game_type = "+game_type+" AND second_bet_amount = 0";
  var sql4 = "select * from game_play where table_id = "+table_id+" AND player_id = "+player_id+" AND game_type = "+game_type+"";
  //console.log(sql4);
  db_con.query(sql4, function (err, result4, fields) {

    if(result4 !='')
    {

      var sql6 = "update users set chips = chips - "+bet_amount+" where id = "+player_id+"";
        db_con.query(sql6, function (err, result6, fields) {});

      var sql1 = "update game_play set second_bet_type = '"+bet_type+"', second_bet_amount = '"+bet_amount+"' where table_id = "+table_id+" AND player_id = "+player_id+" AND game_type = "+game_type+"";
      db_con.query(sql1, function (err, result1, fields) {});
    }

  });
  
  
});


var balance_shuffle_card = {};
router.post('/first_bet_game', async(req, res) => {

  player_id = req.body.player_id;
  table_id = req.body.table_id;
  game_type = req.body.game_type;    
  bet_amount = req.body.bet_amount;
  bet_type = req.body.bet_type;


  result = {};

  arr = new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51);
  shuffle_card = shuffle(arr);
  first_ten_card  = arr.splice(0, 10);
  balance_card  = arr.splice(0, 42);
  balance_shuffle_card = balance_card;

    result['ten_card'] = first_ten_card;    
    result['player_id'] = player_id;    
    result['table_id'] = table_id;    
    result['game_type'] = game_type;
    result['bet_type'] = bet_type;        
    result['bet_amount'] = bet_amount;

    results = new Array(result);

    //console.log(results);

    res.send(JSON.stringify({"response": results,"message":'Shuffle Card',"status": 200}));

    //var sql4 = "select * from game_play where table_id = "+table_id+" AND player_id = "+player_id+" AND game_type = "+game_type+" AND first_bet_amount = 0";
    var sql4 = "select * from game_play where table_id = "+table_id+" AND player_id = "+player_id+" AND game_type = "+game_type+"";
    //console.log(sql4);
    db_con.query(sql4, function (err, result4, fields) {

      if(result4 !='')
      {
        
        var sql6 = "update users set chips = chips - "+bet_amount+" where id = "+player_id+"";
        db_con.query(sql6, function (err, result6, fields) {});

        var sql1 = "update game_play set first_bet_type = '"+bet_type+"', first_bet_amount = '"+bet_amount+"' where table_id = "+table_id+" AND player_id = "+player_id+" AND game_type = "+game_type+"";
        db_con.query(sql1, function (err, result1, fields) {});
      }

    });

});


router.post('/result_processing', async(req, res) => {

    table_id = req.body.table_id;
    game_type = req.body.game_type;
    win_status = req.body.win_status;

    db_con.query("CALL result_processing('"+win_status+"', "+game_type+", "+table_id+")", function (err, result, fields) {
      
      if(result !='')
      {
        //res.send(JSON.stringify({"response": result[0],"message":'Result Process',"status": 200}));

          result[0].forEach(element => {
            
          var sql = "update users set chips = chips + "+element.amount+" where id = "+element.player_id+"";

          //console.log(sql);

          db_con.query(sql, function (err, result2, fields) {

          });

        });

        
        var sql2 = "update andar_bahar_game set table_status = 'closed' where id = "+(table_id - 100000)+"";

        //console.log(sql2);

        db_con.query(sql2, function (err, result2, fields) {

          if(result2 !='')
          {
            var sql3 = "insert into andar_bahar_game(activate_player, table_status) values (0, 'open')";
            //console.log(sql3);
            db_con.query(sql3, function (err, result3, fields) {
            });
          }

        });


        


        //res.send(JSON.stringify({"message":'Result Process',"status": 200}));

        res.send(JSON.stringify({"response": result[0],"message":'Result Processed',"status": 200}));

      }
      else
      {
        res.send(JSON.stringify({"message":'Dont Have Result',"status": 400}));
      }

    });

});


router.post('/table_bet_list', async(req, res) => {

  table_id = req.body.table_id;
  game_type = req.body.game_type;
  type = req.body.type;

  db_con.query("CALL table_bet_list_processing('"+type+"', "+game_type+", "+table_id+")", function (err, result, fields) {
    
    if(result !='')
    {
      res.send(JSON.stringify({"response": result[0],"message":'Table Bet List Process',"status": 200}));
    }
    else
    {
      res.send(JSON.stringify({"message":'Dont Have Table Bet List',"status": 400}));
    }

  });

});


  router.post('/game_start', async(req, res) => {


    player_id = req.body.player_id;
    table_id = req.body.table_id;
    game_type = req.body.game_type;    
    active_player = req.body.active_player;
    
    
    result = {};
    
    
    if(active_player == 0)
    {
      timer = await start_game_timer();
      result_card = await set_result_card();
    }
    else
    {
      timer = await running_time();
      result_card = await get_result_card();
    }
    
    
    result['result_card'] = result_card;    
    result['player_id'] = player_id;    
    result['table_id'] = table_id;    
    result['game_type'] = game_type;    
    result['timer'] = timer;

    results = new Array(result);

    //console.log(results);

    res.send(JSON.stringify({"response": results,"message":'Game Joined',"status": 200}));

    var sql4 = "select * from game_play where table_id = "+table_id+" AND player_id = "+player_id+"";
    db_con.query(sql4, function (err, result4, fields) {

      if(result4 !='')
      {
          
      }
      else
      {
        var sql1 = "INSERT INTO game_play(player_id, table_id, game_type) VALUES ('"+player_id+"', "+table_id+", '"+game_type+"')";
        db_con.query(sql1, function (err, result1, fields) {});
    
        var sql2 ="select * from andar_bahar_game where table_status = 'open' AND id = "+(table_id - 100000)+"";
    
        db_con.query(sql2, function (err, result2, fields) {
          if(result2 !='')
          {
            player = result2[0].activate_player + 1;
            var sql3 ="update andar_bahar_game set activate_player = "+player+", table_status = 'registering' where table_status = 'open' AND id = "+(table_id - 100000)+"";
            db_con.query(sql3, function (err, result3, fields) {});
          }
        });
      }

    });


      
  });


  

  router.get('/start_game_timer', function(req, res, next) {
    var counter = 60;
    var interval = setInterval(function() {
    counter--;
    
    if (counter <= 0) {
         clearInterval(interval);
         sending_count = counter;
        return;
    }else{    	
      sending_count = counter;      
    }        
}, 1000);

  });
  

  router.get('/get_game_timer', function(req, res, next) {

    res.send(JSON.stringify({"status": 200, "Timer": sending_count}));
      
  });


  


  



module.exports = router;
