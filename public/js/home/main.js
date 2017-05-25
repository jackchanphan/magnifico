function initBanner(){
    var btns = $('.banner .btns li');
    var pics = $('.banner .pics li');
    var types = ['rand','rand','expand'];
    var eases = [true,false,true];
    var bgcolor = ['rgba(200,200,200,.5)','#fff','rgba(255,255,255,.5)'];
    for(var i=0;i<btns.length;i++){
        if(btns[i].className=='' || btns[i].className.indexOf("current")<0){
            pics[i].style.display = "none";
        }
        btns[i].index = i;
        pics[i].style.transition = "all .5s";
        btns[i].onmouseenter=btns[i].onclick = function(flag){
            if(!flag || flag!=1){
                clearInterval(timer);
            }
            if(this.className.indexOf('current')>=0){
                return;
            }
            for(var j=0;j<btns.length;j++){
                btns[j].className = btns[j].className.replace(/current/g,'').replace(/\s{2}/g,' ');
                pics[j].style.display = 'none';

            }
            this.className+=' current';
            pics[this.index].style.display = 'block';
            setPicMask(pics[this.index],{
                type:types[this.index],
                ease:eases[this.index],
                bgcolor:bgcolor[this.index],
                col:20,
                row:20,
                delay:3
            });
        }
        btns[i].onmouseleave =function(){
                var cnt=0;
                timer = setInterval(function(){
                        btns[cnt++].onmouseenter(1);
                        cnt = cnt%btns.length;
                }, 3000);
        }
    }
    var cnt=0;
    var timer = setInterval(function(){
            btns[cnt++].onmouseenter(1);
            cnt = cnt%btns.length;
    }, 3000);
}
function initFollowUs(){
    var arr = $('.followus-list li');
    for(var i=0;i<arr.length;i++){
        arr[i].style.position = 'relative';
        arr[i].onmouseenter = function(){
            this.style.cursor = 'pointer';
            setPicMask(this,{type:'normal',noRemoveA:true});
        }
        arr[i].onmouseleave = function(){
            clearsetPicMask(this);
        }
    }
}
function initFeaturedwork(){
    var o = $.one('.pic-featuredwork');
        o.style.position = 'relative';
        o.onmouseenter = function(){
            this.style.cursor = 'pointer';
            setPicMask(this,{type:'expand',ease:false});
        }
}
setWindowOnload(function(){
    if(getCookie("initFlag")==null){
        fadeInAll();
        setCookie("initFlag","1");
    }
    initBanner();
    initFollowUs();
    initFeaturedwork();
});