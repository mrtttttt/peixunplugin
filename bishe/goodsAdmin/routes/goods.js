var express = require('express');
var fs = require('fs');
var multer = require('multer');
var router = express.Router();
var mysql =require("./mysql")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload')
    },
    filename: function (req, file, cb) {
        var str="image/jpeg,application/x-jpg,image/png,image/gif";
        if(str.indexOf(file.mimetype)>-1){
            cb(null, new Date().getTime()+file.originalname)
        }else{
            return false;
        }
    }
})

var upload = multer({ storage: storage })

router.post("/add",function (req,res,next) {
    console.log(req.body)
    var gtitle=req.body.gtitle;
    var ginfo=req.body.ginfo;
    var price=req.body.price;
    var category=req.body.category;
    var gphoto=req.body.gphoto;
    var uid=req.body.uid;
    var cid;
    mysql.query("select * from category where cname='"+category+"'",function (err,result) {
        if(err) throw err;
        cid=result[0].cid;
        mysql.query("insert into goods(gtitle,ginfo,price,cid,uid,gphoto) values('"+gtitle+"','"+ginfo+"',"+price+","+cid+","+uid+",'"+gphoto+"')",function (err,result) {
            if(err) throw err;
            res.send("ok")
        })
    })

})

router.post("/upload",upload.single("file"),function (req,res,next) {
    var path="/upload/"+req.file.filename
    res.send(path)
})

router.get("/select",function (req,res,next) {
    mysql.query("select goods.*,user.* from goods,user where goods.uid=user.uid", function (err, result) {
        if (err) throw err;
        for(var i in result){
            if(result[i].gphoto){
                var arr=result[i].gphoto.split(";");
                result[i].gphoto=arr;
            }
        }
        res.send(JSON.stringify(result))
    })
})
router.get("/query/:gid",function (req,res,next) {
    var gid=req.params.gid;
    mysql.query("select goods.*,user.* from goods,user where goods.uid=user.uid and goods.gid="+gid, function (err, result) {
        if (err) throw err;
        console.log(result)
        res.send(JSON.stringify(result))
    })
})


module.exports = router;