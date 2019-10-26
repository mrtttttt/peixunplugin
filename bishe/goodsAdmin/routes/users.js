var express = require('express');
var router = express.Router();
var mysql=require("./mysql");
var md5=require("./md5");

/* GET users listing. */
router.post('/register', function(req, res, next) {
  var phone=req.body.account;
  var pass=req.body.password;
  var pass2=req.body.password2;
  if(pass != pass2){
    res.send("err")
  }else{
      pass=md5(pass);
      mysql.query("insert into user(name,pass,phone) values ('"+phone+"','"+pass+"','"+phone+"')",function (err,result) {
          if(err) throw err;
          res.send(result.insertId.toString());
      })
  }
});
router.post('/login', function(req, res, next) {
  var phone=req.body.account;
  var pass=md5(req.body.password);
  mysql.query("select * from user where phone='"+phone+"' and pass='"+pass+"'",function (err,result) {
      if(err) throw err;
      if(result.length){
          res.send(JSON.stringify(result));
      }else{
          res.send({message:"err"})
      }
  })
});
router.get('/select/:uid', function(req, res, next) {
  var uid=req.params.uid;
  mysql.query("select * from user where uid="+uid,function (err,result) {
      if(err) throw err;
      res.send(JSON.stringify(result));
  })
});
router.get('/selected/:phone', function(req, res, next) {
  var phone=req.params.phone;
  mysql.query("select * from user where phone='"+phone+"'",function (err,result) {
      if(err) throw err;
      if(result.length){
          res.send("already");
      }else{
          res.send("none")
      }
  })
});
router.get('/update', function(req, res, next) {
    var type=req.query.type;
    var a=req.query.a;
    var uid=req.query.uid;
    if(type=="name"){
        mysql.query("update user set name='"+a+"' where uid="+uid,function (err,result) {
            if(err) throw err;
            console.log(result)
            if(result.affectedRows){
                res.send("ok");
            }else{
                res.send("err")
            }
        })
    }else if(type=="phone"){
        mysql.query("update user set phone='"+a+"' where uid="+uid,function (err,result) {
            if(err) throw err;
            console.log(result)
            if(result.affectedRows){
                res.send("ok");
            }else{
                res.send("err")
            }
        })
    }

});
router.get('/updatePass', function(req, res, next) {
    var oldpass=req.query.oldpass;
    var pass=req.query.pass;
    var uid=req.query.uid;
    mysql.query("select * from user where uid="+uid,function (err,result) {
        if(err) throw err;
        console.log(result)
        if(result[0].pass== md5(oldpass)){
            mysql.query("update user set pass='"+md5(pass)+"' where uid="+uid,function (err,result) {
                if(err) throw err;
                if(result.affectedRows){
                    res.send("ok");
                }else{
                    res.send("err")
                }
            })
        }
    })

});

module.exports = router;
