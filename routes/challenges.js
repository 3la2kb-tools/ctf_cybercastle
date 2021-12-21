var express = require('express');
const session = require('express-session');
const res = require('express/lib/response');
var router = express.Router();


router.get('/', function(req, res) {
    if(checkIfLoggedIn(req,res)){
        //WIP
        res.render('challenges',{title:"CyberCastle CTF platform"});
    }
    else{
        res.redirect('/');
    }
});


router.post('/',(req,res) => {
    if(checkIfLoggedIn(req,res)){
        //WIP   
    }
    else{
        res.redirect('/');
    }
})

module.exports = router;
