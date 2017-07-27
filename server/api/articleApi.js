var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
var crypto = require('crypto');
var qiniu = require('qiniu');
var fs = require('fs');

/**加密测试**/
// var cipher = crypto.createCipher('aes-256-cbc','InmbuvP6Z8')
// var text = "123|123123123123123";
// var crypted = cipher.update(text,'utf8','hex')
// console.log(crypted)
// crypted += cipher.final('hex')
// console.log(crypted)
// var decipher = crypto.createDecipher('aes-256-cbc','InmbuvP6Z8')
// var dec = decipher.update(crypted,'hex','utf8')
// console.log(dec)
// dec += decipher.final('utf8')
// console.log(dec)


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

//生成UUID
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

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

//文章详情查找用户信息
router.post('/api/selectUser', (req, res) => {
    var sql = $sql.admin.selectUserMsg;
    conn.query(sql, [req.body.user_id], function(err, result){
        if(err) {
            console.log(err);
            return
        }
        jsonWrite(res, result);
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
    //加密验证
    var cipher = crypto.createCipher('aes-256-cbc','InmbuvP6Z8')
    var crypted = cipher.update(params.userpwd,'utf8','hex')
    crypted += cipher.final('hex')
    conn.query(sql, [params.username, crypted], function(err, result) { 
        if (err) {       
            console.log(err);
            return
        }        
        if (result.length < 1) {
            console.log("账号或密码错误!");
            jsonWrite(res, "error");
            return
        }
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

//
router.get('/api/admin/articleList', (req, res) => {
    var session = req.session;
    var user = session.user;
    var sql = $sql.admin.findArticleList;   
    conn.query(sql, user[0].id, function(err, result){
        if(err) {
            console.log(err);
            return
        }
        jsonWrite(res, result);
    })
});

//
router.post('/api/admin/saveArticle', (req, res) => {
    var session = req.session;
    var user = session.user;
    var sql = $sql.admin.saveArticle;
    var msg = req.body.articleInformation;
    conn.query(sql, [guid(), msg.title, msg.content, msg.state, user[0].id], function(err, result){
        if(err) {
            console.log(err);
            return
        }
        jsonWrite(res, result);
    })
});

//
router.get('/api/admin/articleDetails/:id', (req, res) => {
    var sql = $sql.admin.selectArticle;
    conn.query(sql, [req.params.id], function(err, result){
        if(err) {
            console.log(err);
            return
        }
        jsonWrite(res, result);
    })
});

router.post('/api/admin/articleDetails', (req, res) => {
    var sql = $sql.admin.selectArticle;
    conn.query(sql, [req.body.id], function(err, result){
        if(err) {
            console.log(err);
            return
        }
        jsonWrite(res, result);
    })
});

router.post('/api/admin/del', (req, res) => {
    var sql = $sql.admin.delArticle;
    conn.query(sql, [req.body.id], function(err, result){
        if(err) {
            console.log(err);
            return
        }
        jsonWrite(res, result);
    })
});

router.post('/api/admin/updateArticle', (req, res) => {
    var sql = $sql.admin.updateArticle;
    var msg = req.body.obj;
    conn.query(sql, [msg.title, msg.content, msg.state, msg.id], function(err, result){
        if(err) {
            console.log(err);
            return
        }
        jsonWrite(res, result);
    })
});

router.post('/api/admin/selectUserMsg', (req, res) => {
    var session = req.session;
    var user = session.user;
    var sql = $sql.admin.selectUserMsg;
    var msg = req.body.obj;
    conn.query(sql, [user[0].id], function(err, result){
        if(err) {
            console.log(err);
            return
        }
        jsonWrite(res, result);
    })
});

router.post('/api/admin/savePerMsg', (req, res) => {
    var session = req.session;
    var user = session.user;
    if(!!req.body.msg.images){
        //console.log(req.body.localFile.images);
        var base64Data = req.body.msg.images.replace(/^data:image\/\w+;base64,/, "");
        var binaryData = new Buffer(base64Data,'base64');
            fs.writeFileSync("./images/" + user[0].id + "_" + "head" + "_" + req.body.msg.imagesName, binaryData);
        console.log('---');
        console.log(binaryData);
        //qiniu
        // 初始化ak,sk
        var accessKey = 'gSSycqN6aKTwa6-B1sU1xZ1PTdQ-8spRvBCvQWa9';
        var secretKey = '0qFMflUTk3wbp67oUgQiCsLkwL_UmXFRuS2RCoPs';
        var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        var options = {
          scope: 'blog',
        };
        var config = new qiniu.conf.Config();
        // 空间对应的机房
        config.zone = qiniu.zone.Zone_z2;
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var uploadToken=putPolicy.uploadToken(mac);
        console.log(req.body.msg.patchUpload);
        if(req.body.msg.patchUpload == 'true'){
            // 文件分片上传
            var resumeUploader = new qiniu.resume_up.ResumeUploader(config);
            var putExtra = new qiniu.resume_up.PutExtra();
            //扩展参数
            putExtra.params = {
              "x:name": "",
              "x:age": 27,
            }
            putExtra.fname = req.body.msg.imagesName;
            // 如果指定了断点记录文件，那么下次会从指定的该文件尝试读取上次上传的进度，以实现断点续传
            putExtra.resumeRecordFile = 'progress.log';
            var key = null;
            putExtra.progressCallback = function(uploadBytes, totalBytes){
                console.log("progress:" + uploadBytes + "(" + totalBytes + ")");
            }
            // 分片上传
            resumeUploader.putFile(uploadToken, key, "./images/" + user[0].id + "_" + "head" + "_" + req.body.msg.imagesName , putExtra, function(respErr,
              respBody, respInfo) {
              if (respErr) {
                console.log(respErr);
                jsonWrite(res, "error");
              }
              if (respInfo.statusCode == 200) {
                console.log(respBody);
                var sql = $sql.admin.saveUserImg;
                var msg = req.body.form;
                conn.query(sql, [msg.name, msg.motto, respBody.key, user[0].id], function(err, result){
                    if(err) {
                        console.log(err);
                        return
                    }
                        jsonWrite(res, "success");
                })
              } else {
                //jsonWrite(res, "error");
                console.log(respInfo.statusCode);
                console.log(respBody);
              }
            });
        }else{
            //文件直接上传
            var key =  user[0].id + "_" + "head" + "_" + req.body.msg.imagesName;
            var formUploader = new qiniu.form_up.FormUploader(config);
            var putExtra = new qiniu.form_up.PutExtra();
            //上传
            formUploader.putFile(uploadToken, key, './images/' + user[0].id + "_" + "head" + "_" + req.body.msg.imagesName, putExtra, function(respErr,
              respBody, respInfo) {
              if (respErr) {
                console.log(respErr);
                jsonWrite(res, "error");
              }
              if (respInfo.statusCode == 200) {
                console.log(respBody);
                var sql = $sql.admin.saveUserImg;
                var msg = req.body.form;
                conn.query(sql, [msg.name, msg.motto, respBody.key, user[0].id], function(err, result){
                    if(err) {
                        console.log(err);
                        return
                    }
                        jsonWrite(res, "success");
                })
              } else {
                console.log(respInfo.statusCode);
                console.log(respBody);
                //jsonWrite(res, "error");
              }
            });
        }
    }else{
        var sql = $sql.admin.saveUser;
        var msg = req.body.form;
        conn.query(sql, [msg.name, msg.motto, user[0].id], function(err, result){
            if(err) {
                console.log(err);
                return
            }
                jsonWrite(res, "success");
        })
    }
});

// router.post('/api/register', (req, res) => {
//     var authSql = $sql.admin.regAuth;
//     var userSql = $sql.admin.regUser;
//     var username = new Array('201300329', '201300336', '201300339', '201300331', '201300345', '201300347', '201300356', '201300365','201300343');
//     var userpwd = '123456';
//     for(var item in username){
//         var authUUID = guid();
//         var userUUID = guid();
//         var cipher = crypto.createCipher('aes-256-cbc','InmbuvP6Z8')
//         var crypted = cipher.update(userpwd,'utf8','hex')
//         crypted += cipher.final('hex')
//         conn.query(authSql, [authUUID, username[item], crypted], function(err, result) {
//             if(err){
//                 return
//             }console.log('success register auth');
//         });
//         conn.query(userSql, [userUUID, authUUID], function(err, result) {
//             if(err){
//                 return
//             }console.log('success register user');
//         });
//     } 
// });

module.exports = router;