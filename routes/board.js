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
router.get('/',  function (req, res, next) {
    
    
        db.all(`select * from bulletin_board`,function(err,rows){
     
         var object=new Array();
         object=rows;
         res.render('board',{name: req.session.name, list: rows.length, object});
        console.log(rows);
        
        });

    

});

router.get('/:id',  function (req, res, next) {
    console.log('id: '+req.params.id);
    console.log(req.params.id);
    db.get(`select * from bulletin_board where listnum = "${req.params.id}"`, function(err, row){
        if(err)console.log('error message: '+err.message);
        else{
            console.log(row);
            var obj = new Array();
            obj = row;
            console.log(obj);
            res.render('board_info',{name: req.session.name, obj});
        }
    });
});

 module.exports = router;