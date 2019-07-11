var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();


router.get('/', function(req, res) {
  console.log(req.session.isLogin);
  
  if(req.session.isLogin===true){
    console.log('stay index.js');
    res.render('index',{name: req.session.name});
  }else{
    res.redirect('login');
  }
  
});



module.exports = router;
