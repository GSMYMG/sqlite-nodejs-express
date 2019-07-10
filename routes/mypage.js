var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./db/my.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      console.log(err);
  } else {
      console.log('success');
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('mypage',{name: req.session.name});
  console.log('')
  db.all(`SELECT * FROM person`,function(err, row){
    req.session.email=row.email;
    req.session.grade=row.grade;
    req.session.class=row.class;
    req.session.number=row.number;

    console.log( session.email);
    console.log(session.grade);
    console.log(session.class);
    console.log( session.number);
  })
    



  res.render('mypage',{password: req.session.password});
  res.render('mypage',{email: req.session.email});
  res.render('mypage',{grade: req.session.grade});
  res.render('mypage',{class: req.session.class});
  res.render('mypage',{number: req.session.number});
});

module.exports = router;
