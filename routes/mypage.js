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
router.get('/', function(req, res, next) {
  var obj ={name: req.session.name, password: req.session.password, email: req.session.email, grade: req.session.grade, class_id: req.session.class_id, number: req.session.number};
  console.log(obj);
  res.render('mypage', obj);
  console.log('my get');
  
});

router.post('/', function(req, res){
const updateQuery=`UPDATE person SET user_name="${req.body.name}",
user_password="${req.body.password}",user_email="${req.body.email}",
user_grade="${req.body.grade}",user_class="${req.body.class_id}",
user_number="${req.body.number}"WHERE user_name="${req.session.name}"`;

  db.serialize(() => {
    db.each(updateQuery);
});

req.session.name = req.body.name;
req.session.password = req.body.password;
req.session.email = req.body.email;
req.session.grade = req.body.grade;
req.session.class_id = req.body.class_id;
req.session.number = req.body.number;
  res.redirect('mypage');
  
});

module.exports = router;


