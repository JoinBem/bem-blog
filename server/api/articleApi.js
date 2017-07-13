var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
var crypto = require('crypto');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

// 查询文章列表
router.get('/api/articleList', (req, res) => {
    var sql = $sql.article.findArticleList;    
    var params = req.body;    
    console.log(params);
    conn.query(sql, function(err, result) {    
        if (err) {       
            console.log(err);
        }        
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//查询文章详情
router.get('/api/articleDetails/:id', (req, res) => {
    var sql = $sql.article.findArticleDetails;
    console.log(sql);
    conn.query(sql, [req.params.id], function(err, docs){
        if (err) {
            console.log(err)
            return
        }
        console.log(docs)
        jsonWrite(res, docs)
    })
});

//判断是否登录
router.get('/api/admin', (req, res) => {
    var session = req.session;
    var user = session.user;
    var isLogined = !!user;
    if(isLogined){
        jsonWrite(res, user)
        return
    }
        jsonWrite(res, "noSession")
        
});

//登录验证
router.post('/api/login', (req, res) => {
    var session = req.session;
    var sql = $sql.admin.userLogin;    
    var params = req.body;
    conn.query(sql, [params.username, params.userpwd], function(err, result) {    
        if (err) {       
            console.log(err);
            return
        }        
        if (result.length < 1) {
            console.log("账号或密码错误!");
            jsonWrite(res, "error");
            return
        }
var cipher = crypto.createCipher('aes-256-cbc','InmbuvP6Z8')
var text = "123|123123123123123";
var crypted = cipher.update(text,'utf8','hex')
console.log(crypted)
crypted += cipher.final('hex')
console.log(crypted)
var decipher = crypto.createDecipher('aes-256-cbc','InmbuvP6Z8')
var dec = decipher.update(crypted,'hex','utf8')
console.log(dec)
dec += decipher.final('utf8')
console.log(dec)
        //查询用户信息
        var sql = $sql.admin.findUser;
        conn.query(sql, result[0]['id'], function(err, result){
            if(err){
                return
            }
            session.user = result;
            //req.session.cookie.expires = new Date(Date.now() + 30)
            jsonWrite(res, result);
        })
    })
});

module.exports = router;