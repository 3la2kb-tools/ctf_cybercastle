var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  if(checkIfLoggedIn(req,res)){
    if(checkIfAdmin(req,res)){
      res.redirect('/admin');
    }
    else {
      res.redirect('/challenges');
    }
  }
  else {
    res.render('index',{title:"CyberCastle CTF platform"});
  }
});


router.post('/',(req,res) => {

  if(checkIfLoggedIn(req,res)){
    if(checkIfAdmin(req,res)){
      res.redirect('/admin');
    }
    else {
      res.redirect('/challenges');
    }
  }
  else {

    var username = connection.escape(req.body.username);
    var password = connection.escape(req.body.password);
    var query = connection.query("SELECT id FROM users WHERE username=? and password=?",[username,password], function (err, results, fields) 
    {
      if (err){

        res.render('index',{title:"CyberCastle CTF platform", msg:"an error occured"})

      }
      else if(results[0]){

        var id = results[0].id;
        if(id !== 0){

          session = req.session;
          session.userid = id;
          res.render('challenges',{title:"CyberCastle CTF platform"});

        }

        else {

          session = req.session;
          session.userid = id;
          res.render('admin',{title:"CyberCastle CTF platform"});
        }
      }
      else{
        res.redirect('index',{title:"CyberCastle CTF platform",error:"Invalid username or password"})

      }


    })
  }

})

module.exports = router;
