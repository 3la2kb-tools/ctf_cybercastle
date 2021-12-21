var express = require('express');
const session = require('express-session');
const res = require('express/lib/response');
var router = express.Router();


router.get('/', function(req, res) {
    if(checkIfAdmin(req,res)){
        res.render('admin',{title:"CyberCastle CTF platform"});
    }
    else{
        res.redirect('/');
    }
});


router.post('/',(req,res) => {
    if(checkIfAdmin(req,res)){
        var name = connection.escape(req.body.name);
        var description = connection.escape(req.body.description);
        var flag = connection.escape(req.body.flag);
        var points = Number(req.body.points);
        var query =connection.query("INSERT INTO challenges (name, description, flag, points) VALUES (?, ?, ?, ?)",[name,description,flag,points], function (err, results, fields) 
        {
        if (err){

            res.render('admin',{title:"CyberCastle CTF platform", msg:"An error occured"});

        }
        else {
            res.render('admin',{title:"CyberCastle CTF platform", msg:"Challenge has been uploaded successfully"});
        }


        });
    }
    else{
        res.redirect('/');
    }
})

module.exports = router;
