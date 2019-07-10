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

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('insert');
});

router.post('/', function (req, res, next) {
    const {user_name, user_password, user_email, user_grade, user_class, user_number} = req.body;
    const query = `insert into person(user_name, user_password, user_email, user_grade, user_class, user_number) values ('${user_name}', '${user_password}', '${user_email}', '${user_grade}', '${user_class}', '${user_number}')`;
    
    db.serialize();
    db.each(query);
    res.redirect('/login');
});



module.exports = router;


