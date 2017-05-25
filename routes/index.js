var express = require('express');
var router = express.Router();
var http = require('http');
var path = require('path');
var $ = require('jquery')(require("jsdom").jsdom().defaultView);
var superagent = require('superagent');
var absPath = path.resolve(__dirname, '../');
router.get('/',
function(req, res, next) {
    res.sendFile('index.html', {
        root: absPath
    });
});
router.get('/about',
function(req, res, next) {
    res.sendFile('html/about.html', {
        root: absPath
    });
});
router.get('/portfolio',
function(req, res, next) {
    res.sendFile('html/portfolio.html', {
        root: absPath
    });
});
router.get('/blog',
function(req, res, next) {
    res.sendFile('html/blog.html', {
        root: absPath
    });
});
router.get('/contact',
function(req, res, next) {
    res.sendFile('html/contact.html', {
        root: absPath
    });
});
router.get('/intro',
function(req, res, next) {
    res.sendFile('html/intro.html', {
        root: absPath
    });
});
var subscribeEmail = {
    '123@123.com': 1,
    'admin@admin.com': 1
};
router.get('/subscribe',
function(req, res, next) {
    if (subscribeEmail[req.query.email] == 1) {
        res.end("<font style='color:red'>You've Subscribed Already!</font>");
    } else {
        res.end("<font style='color:green'>You've Successfully Subscribed!</font>");
        subscribeEmail[req.query.email] = 1;
    }
});
router.post('/survey',
function(req, res, next) {
    res.end('ok');
});
router.get('/survey',
function(req, res, next) {
    res.end('ok');
});
var existsKV = {
    usrname: 'admin',
    email: '123@123.com'
};
router.post('/check',
function(req, res, next) {
    var name = req.body.sname;
    var val = req.body.sval;
    if (existsKV[name] == val) {
        res.end('not ok');
    } else {
        res.end('ok');
    }
});
router.get('/search',
function(sreq, sres, next) {
    var keyword = sreq.query.keyword;
    // request with superagent
    var req = superagent.get('http://www.baidu.com/s?wd=' + encodeURI(keyword) + '&rn=50').end(function(err, res) {
        var content = '';
        $(res.text).find('h3>a').each(function(i) {
            content += ((i + 1) + '. <a style="color:#fff" target="blank" href="' + $(this).attr('href') + '">' + $(this).html() + '</a><br>');
        });
        content = '<font class="bold f24 search-rst">' + res.text.match(/百度为您找到相关结果约.+个/)[0].replace(/百度/, '').replace('为您找到', '为您找到' + keyword) + '</font><br><font class="bold f20">这是前五十条记录</font><hr>' + content;
        sres.end(content);
    });
});
module.exports = router;