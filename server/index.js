// node 后端服务器

const articleApi = require('./api/articleApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const app = express();

var identityKey = 'skey';

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(session({
    name: identityKey,
    secret: 'bem',  // 用来对session id相关的cookie进行签名
    store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 60 * 1000 * 60  // 有效期，单位是毫秒
    },
    rolling: true   //访问服务器刷新过期时间
}));

// 后端api路由
app.use(articleApi);

function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

// 后台管理页
app.get('/aaa', function(req, res) {
	console.log('aaa');
    var html = fs.readFileSync('./src/module/admin/admin.html', 'utf-8');
	res.send(html)
});

// 博客首页
app.get('*', function(req, res) {
    var html = fs.readFileSync('./src/module/index/index.html', 'utf-8');
    res.send(html)
});

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');