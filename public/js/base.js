function $(selector, obj) {
    if (!obj) {
        return document.querySelectorAll(selector);
    } else {
        return obj.querySelectorAll(selector);
    }
}
$.one = function(selector, obj) {
    if (!obj) {
        return document.querySelector(selector);
    } else {
        return obj.querySelector(selector);
    }
}

function getScrollTop() {
    return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
}

function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}

function msgbox(msg,delay,conf) {
    var box = $.one('._msgbox_');
    if(box!=undefined && box!=null){
        document.body.removeChild(box);
    }
    box=null;
    var scrollTop = getScrollTop();
    var delay = delay || 1500;
    box = document.createElement('div');
    box.className = '_msgbox_';
    var styleConf = 'position:absolute;background:rgba(0,0,0,.8);color:#fff;' + 'font-size:30px;width:400px;min-width:400px;padding:2rem;' + 'height:100px;left:50%;' + 'margin-left:-200px;top:50%;margin-top:' + (scrollTop - 50) + 'px;text-align:center;line-height:100px;border-radius:20px;'
    styleConf = styleConf.split(';');
    for (var i = 0; i < styleConf.length; i++) {
        var kv = styleConf[i].split(':');
        box.style[kv[0]] = kv[1];
    }
    if(conf){
        for (var k in conf) {
            box.style[k] = conf[k];
        }
    }
    document.body.appendChild(box);
    box.style.marginLeft = -box.offsetWidth/2+'px';
    box.style.marginTop = (scrollTop - box.offsetHeight/2)+'px';
    box.innerHTML = msg;
    setTimeout(function() {
        if(box && box.parentNode){
            box.parentNode.removeChild(box);
        }
    }, delay);
    return box;
}

function getMousePos(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    return {
        'x': x,
        'y': y
    };
}

function getXhr() {
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
    }
    return xhr;
}

function aSend(url, kv, method, callback) {
    var xhr = getXhr();
    if (xhr == null) {
        msgbox('NO AJAX');
        return;
    }
    var para = '';
    for (var k in kv) {
        para += k + '=' + kv[k] + '&';
    }
    para = para.substr(0, para.length - 1);
    if (method.toLowerCase() == 'get') {
        url += '?' + para;
    }
    url = encodeURI(url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr);
            }
        }
    }
    xhr.open(method, url, true);
    if (method.toLowerCase() == 'get') {
        xhr.send();
    } else {
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(para);
    }
}

/*  COOKIES BEGIN */
//set cookies 
function setCookie(name, value, duration) {
    var exp = new Date();
    duration = duration || 60000;
    exp.setTime(exp.getTime() + duration);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//get cookies 
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

    return unescape(arr[2]);
    else return null;
}

//delete cookies 
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (!cval) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}
/* COOKIES END */
/*PAGE CONTROLL START*/
function nextPage(selector, subselector, rotateType) {
    var pages = $(selector);
    var rotate = rotateType || 'Yaxis';
    for (var i = 0; i < pages.length; i++) {
        if (pages[i].style.display != 'none') {
            if (i + 1 < pages.length) {
                pages[i + 1].style.transform = 'rotateY(90deg)';
                pages[i + 1].style.display = 'block';
                (function(p) {
                    var subs = [];
                    if (subselector != undefined) {
                        subs = $(subselector, p);
                        console.log(subs);
                        for (var j = 0; j < subs.length; j++) {
                            if (rotate == 'both') {
                                subs[j].style.transform = 'rotateY(90deg) rotateX(90deg)';
                            } else {
                                subs[j].style.transform = 'rotateY(90deg) ';
                            }
                            subs[j].style.transition = 'all 1s';
                            (function(s, delay) {
                                setTimeout(function() {
                                    if (rotate == 'both') {
                                        s.style.transform = 'rotateY(0deg) rotateX(0deg)';
                                    } else {
                                        s.style.transform = 'rotateY(0deg)';
                                    }
                                }, delay)
                            })(subs[j], j * 200);
                        }
                        setTimeout(function() {
                            p.style.transition = "transform 1s";
                            p.style.transform = 'rotateY(0deg)';
                        }, 100);
                    } else {
                        setTimeout(function() {
                            p.style.transition = "transform 1s";
                            p.style.transform = 'rotateY(0deg)';
                        }, 100);
                    }
                })(pages[i + 1]);
                pages[i].style.display = 'none';
            } else {
                msgbox('THIS IS THE LAST PAGE!');
            }
            break;
        }
    }
}

function prePage(selector, subselector, rotateType) {
    var pages = $(selector);
    var rotate = rotateType || 'Yaxis';
    for (var i = 0; i < pages.length; i++) {
        if (pages[i].style.display != 'none') {
            if (i - 1 >= 0) {
                pages[i - 1].style.transform = 'rotateY(90deg)';
                pages[i - 1].style.display = 'block';
                (function(p) {
                    var subs = [];
                    if (subselector != undefined) {
                        subs = $(subselector, p);
                        console.log(subs);
                        for (var j = 0; j < subs.length; j++) {
                            if (rotate == 'both') {
                                subs[j].style.transform = 'rotateY(90deg) rotateX(90deg)';
                            } else {
                                subs[j].style.transform = 'rotateY(90deg) ';
                            }
                            subs[j].style.transition = 'all 1s';
                            (function(s, delay) {
                                setTimeout(function() {
                                    if (rotate == 'both') {
                                        s.style.transform = 'rotateY(0deg) rotateX(0deg)';
                                    } else {
                                        s.style.transform = 'rotateY(0deg)';
                                    }
                                }, delay)
                            })(subs[j], j * 200);
                        }
                        setTimeout(function() {
                            p.style.transition = "transform 1s";
                            p.style.transform = 'rotateY(0deg)';
                        }, 100);
                    } else {
                        setTimeout(function() {
                            p.style.transition = "transform 1s";
                            p.style.transform = 'rotateY(0deg)';
                        }, 100);
                    }
                })(pages[i - 1]);
                pages[i].style.display = 'none';
            } else {
                msgbox('THIS IS THE FIRST PAGE!');
            }
            break;
        }
    }
} /* PAGE CONTROLL END */

function fadeInAll() {
    var allObj = $('body *');
    for (var i = 0; i < allObj.length; i++) {
        if (allObj[i].tagName.toLowerCase() == 'br' || allObj[i].tagName.toLowerCase() == 'text' || allObj[i].style.opacity == '0') {
            continue;
        }
        allObj[i].style.opacity = '0';
        allObj[i].style.transition = 'all 1s';
        (function(obj, i) {
            setTimeout(function() {
                obj.style.opacity = '';
                obj.style.transition = '';
            }, i * 20);
        })(allObj[i], i);
    }
}
function initLink() {
    var arr = $('a');
    for (var i = 0; i < arr.length; i++) {
        if(arr[i].href.replace(/\s/g,'')==''){
            arr[i].href='javascript:void(0)';
        }
        arr[i].oriColor = arr[i].style.color;
        arr[i].onmouseover = function() {
            this.style.color = 'highlight';
            if (this.className.indexOf('underline') >= 0 || getStyle(this, 'border-bottom') != '') {
                this.borderBottom = getStyle(this, 'border-bottom');
                this.style.borderBottom = '1px solid highlight';
            }
        }
        arr[i].onmouseout = function() {
            this.style.color = this.oriColor;
            if (this.className.indexOf('underline') >= 0 || getStyle(this, 'border-bottom') != '') {
                this.style.borderBottom = this.borderBottom;
            }
        }
    }
}
function setPicMask(o, conf) {
    var w = o.offsetWidth;
    var h = o.offsetHeight;
    var wait = conf.wait || 0;
    var row = conf.row || 20;
    var col = conf.col || 20;
    var total = conf.total || col * row;
    var delay = conf.delay || 4;
    var type = conf.type || 'normal';
    var ease = conf.ease || false;
    var removeDelay = conf.removeDelay || 1000;
    var noRemoveA = conf.noRemoveA || false;
    var bgcolor = conf.bgcolor || '#fff';
    o.style.position = 'relative';
    if (!type || type == 'normal') {
        total = 1;
        row = 1;
        col = 1;
    }
    for (var i = 0; i < total; i++) {
        if (i > total / 2) {
            wait--;
        } else {
            wait++;
        }
        var a = document.createElement('a');
        a.index = i;
        a.className = '_expand_';
        if (!type || type == 'normal') {
            a.waitTime = 1;
            a.style.width = Math.ceil(w / col) + 'px';
            a.style.height = 0 + 'px';
            a.finalHeight = Math.ceil(h / row) + 'px';
            a.style.opacity = '0';
        } else {
            if (type == 'rand') {
                a.waitTime = Math.ceil(Math.random() * Math.ceil(total / 2));
            } else {
                a.waitTime = Math.ceil(total / 2) - wait;
            }
            a.style.background = bgcolor;
            a.style.width = Math.ceil(w / col) + 'px';
            a.style.height = Math.ceil(h / row) + 'px';
            a.style.opacity = '1';
        }
        a.style.position = "absolute";
        a.style.top = Math.floor(i / row) * Math.ceil(h / row) + 'px';
        a.style.left = Math.floor(i % col) * Math.ceil(w / col) + 'px';
        if (ease) {
            a.style.transition = "all .5s";
        }(function(a, type) {
            setTimeout(function() {
                if (!type || type == 'normal') {
                    a.style.height = a.finalHeight;
                    a.style.opacity = '.4';
                } else {
                    a.style.opacity = '0';
                    a.style.height = '0';
                }
                if (!noRemoveA) {
                    setTimeout(function() {
                        if (a.parentNode) {
                            a.parentNode.removeChild(a);
                        }
                    }, removeDelay);
                }
            }, delay * a.waitTime);
            o.appendChild(a);
        })(a, type);
    }
}

function initPic() {
    var allObj = $('.wrap *');
    for (var i = 0; i < allObj.length; i++) {
        var t = allObj[i];
        if (t.className.indexOf('pic-') >= 0) {
            if (t.className.indexOf('set-mask') >= 0) {
                t.onmouseenter = function() {
                    this.style.cursor = 'pointer';
                    setPicMask(this, {
                        type: 'expand',
                        ease: true
                    });
                }
                continue;
            }
            var a = document.createElement('a');
            a.className = '_pic_cover_';
            a.style.width = '100%';
            a.style.height = '100%';
            a.style.background = '#fff';
            a.style.opacity = '0';
            a.style.transition = 'all .5s';
            a.style.display = 'block';
            t.aCover = a;
            t.appendChild(a);
            t.onmouseenter = function() {
                this.style.cursor = 'pointer';
                a.style.transition = 'all 0s';
                this.aCover.style.opacity = '.9';
                a.style.transition = 'all .5s';
                var target = this;
                setTimeout(function() {
                    target.aCover.style.opacity = '.2';
                }, 300);
            }
            t.onmouseleave = function() {
                this.style.cursor = 'default';
                this.aCover.style.opacity = '0';
            }
        }
    }
}

function initTitle() {
    var titles = $('.wrap *');
    for (var i = 0; i < titles.length; i++) {
        var t = titles[i];
        if (t.className.indexOf('f24') >= 0 || /^h\d{1}/i.test(t.tagName) || t.className.indexOf('title') >= 0) {
            t.oriColor = getStyle(t, 'color');
            for (var j = 0; j < t.children.length; j++) {
                t.children[j].oriColor = getStyle(t.children[j], 'color');
            }
            t.onmouseover = t.onmousedown = function() {
                for (var j = 0; j < this.children.length; j++) {
                    this.children[j].style.color = 'red';
                }
                this.style.cursor = 'pointer';
                this.style.color = 'red';
            }
            t.onmouseout = t.onmouseup = function() {
                for (var j = 0; j < this.children.length; j++) {
                    this.children[j].style.color = this.children[j].oriColor;
                }
                this.style.cursor = 'default';
                this.style.color = this.oriColor;
            }
        }
    }
}

function clearsetPicMask(obj) {
    var delA = $('._expand_');
    for (var i = 0; i < delA.length; i++) {
        delA[i].parentNode.removeChild(delA[i]);
    }
} 

function initIcon() {
    var icons = $('.wrap *');
    for (var i = 0; i < icons.length; i++) {
        if (icons[i].tagName.toLowerCase() == 'i' || icons[i].className.indexOf('icon-') >= 0) {
            icons[i].style.transition = 'all 1s';
            icons[i].onmouseover = function() {
                this.style.cursor = 'pointer';
                this.style.transform = 'scale(.9)';
            }
            icons[i].onmouseout = function() {
                this.style.cursor = 'default';
                this.style.transform = 'scale(1)';
            }
        }
    }
}
function initSearchBox() {
    var keyword = $.one('input[name=keyword]');
    var searchBtn = $.one('.btn-search');
    searchBtn.type = 'button';
    searchBtn.onclick = function() {
        var val = keyword.value;
        var kv = {
            'keyword': val
        };
        if (val.length > 0) {
                var oDiv = $.one('._searchbox_');
                if(oDiv){
                    oDiv.parentNode.removeChild(oDiv);
                }
                var div = document.createElement('div');
                div.className = '_searchbox_';
                var wrapOffsetLeft = $.one('.wrap').offsetLeft;
                div.style.position='absolute';
                div.style.left=keyword.offsetLeft+wrapOffsetLeft+'px';
                div.style.top=keyword.offsetTop+30+'px';
                div.style.width='300px';
                div.style.minWidth='200px';
                div.style.minHeight='50px';
                div.style.maxHeight='400px';
                div.style.overflow='auto';
                div.style.background='#333';
                div.style.opacity='.9';
                div.style.fontDecoration='none';
                div.style.fontStyle='normal';
                div.style.lineHeight='2em';
                div.style.padding='2em';
                div.style.color='#fff';
                div.innerHTML = '<span class="f24">Loading...</span>';
                document.body.appendChild(div);
                aSend('/search', kv, 'get', function(xhr) {
                div.innerHTML = xhr.responseText;
                div.onclick = function(){
                    this.parentNode.removeChild(this);
                }
            });
        } else {
            msgbox('please enter some words!');
            return;
        }
    }
}
function subscribe(h,kv){
    aSend(h,kv,'GET',function(xhr){
        msgbox(xhr.responseText,2000,{'min-width':'600px','width':'600px','height':'80px'});
    });
}
function initSubscribe(){
    var sub = $.one('a[href="/subscribe"]');
    sub.onclick = function(){
        var oDiv = $.one('._subscribediv_');
        if(oDiv){
            oDiv.parentNode.removeChild(oDiv);
        }
        var inputDiv = msgbox('EMAIL:',1000000,{'text-align':'center'});
        inputDiv.className = '_subscribediv_';
        var inputEmail = document.createElement('input');
        var btn = document.createElement('button');
        var closeBtn = document.createElement('button');
        var p = document.createElement('p');
        p.style.fontSize='18px';
        p.style.color='red';
        p.style.height='1.5rem';
        p.style.marginTop = '-4rem';
        btn.style.padding=inputEmail.style.padding='.5rem';
        btn.style.verticalAlign=inputEmail.style.verticalAlign='middle';
        btn.innerHTML='SUBSCRIBE';
        closeBtn.innerHTML='X';
        closeBtn.className='closeBtn';
        btn.style.marginLeft='1rem';
        inputDiv.appendChild(inputEmail);
        inputDiv.appendChild(btn);
        inputDiv.appendChild(p);
        inputDiv.appendChild(closeBtn);
        btn.onclick = function(){
            if(/^\w{2,20}@\w{2,10}\.\w{1,}/.test(inputEmail.value)){
                subscribe(sub.dataset.orihref,{'email':inputEmail.value});
                inputDiv.parentNode.removeChild(inputDiv);
            }else{
                p.innerHTML='error email address';
                inputEmail.onfocus = function(){
                    p.innerHTML = '';
                }
            }
        }
        closeBtn.onclick = function(){
                inputDiv.parentNode.removeChild(inputDiv);
        }
    }
    sub.dataset.orihref = sub.href;
    sub.href = 'javascript:void(0)';
}

var windowOnloadFuncs = [];
// function queue to be executed when window loading
function setWindowOnload(func) {
    windowOnloadFuncs[windowOnloadFuncs.length] = func;
}
window.onload = function() {
    initLink();
    initPic();
    initTitle();
    initIcon();
    initSearchBox();
    initSubscribe();
    for (var i = 0; i < windowOnloadFuncs.length; i++) {
        windowOnloadFuncs[i]();
    }
}