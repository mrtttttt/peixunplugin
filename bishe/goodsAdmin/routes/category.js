var express = require('express');
var router = express.Router();
var mysql =require("./mysql")
router.get("/select",function (req,res,next) {
    mysql.query("select * from category",function (err,result) {
        if(err) throw err;
        res.send(JSON.stringify(result))
    })
})

module.exports = router;