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
    if(req.session.isLogin===true){
        console.log('stay index.js');
        res.render('aplct',{name: req.session.name});
      }else{
        res.redirect('login');
      }

});

router.post('/', function (req, res, next) {
 
    const query = `insert into bulletin_board(title, kind, story, user_name) values ('${req.body.title}', '${req.body.kind}', '${req.body.story}','${req.session.name}')`;
    
    console.log(query);

    db.serialize();
    db.each(query);
    res.redirect('/');
});



module.exports = router;


