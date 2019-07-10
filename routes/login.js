var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('./db/my.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('success');
    }
});


router.get('/', function (req, res, next) {
    res.render('login');
});


router.post('/', function (req, res) {
    if(req.body.user_name && req.body.user_password){
        var userId = req.body.user_name;
        var userPw = req.body.user_password;
        console.log('userId: ', userId);

        db.get(`select * from person where user_name="${userId}"`, function (err, row) {
            if(err){
                console.log('error');
                console.log(err.message);
            }else{
                console.log(row);
                
                if(row.user_name === userId && row.user_password === userPw){
                    console.log('로그인 성공');
                    req.session.isLogin = true;
                    req.session.name = userId;
                    req.session.password = userPw;
                    console.log(req.session);
                    req.session.save(function(){
                        res.redirect('/');
                });
                   
                }else{
                    console.log('로그인 실패');
                    res.redirect('/login');
                }
            }
        });
    }
    
});


module.exports = router;


