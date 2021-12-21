var express = require('express');
const session = require('express-session');
var router = express.Router();



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
    res.render('register',{title:"CyberCastle CTF platform"});
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
  var query = connection.query("INSERT INTO users (username, password) VALUES (?, ?)",[username,password], function (err, results, fields) 
  {
    if (err){

      res.render('register',{title:"CyberCastle CTF platform", msg:"an error occured"})

    }
    else {
      res.render('register',{title:"CyberCastle CTF platform", msg:"Registered successfully"})
    }


  })
}
})

module.exports = router;
