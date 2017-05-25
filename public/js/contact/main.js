function setError(obj){
        obj.oriBgcolor = getStyle(obj,'background');
        obj.style.background='#f00';
        obj.onblur = function(){
            this.style.background = this.oriBgcolor;
        }
}
function validForm(formName){
    var usrname = $.one('#usrname');
    var email = $.one('#email');
    var msg = $.one('#msg');
    if(usrname.value==''){
        msgbox('username is empty!');
        setError(usrname);
        usrname.focus();
        return false;
    }else if(!/^\w{2,20}@\w{2,10}\.\w{1,}/.test(email.value)){
        msgbox('plz enter a correct email');
        setError(email);
        email.focus();
        return false;
    }else if(msg.value.replace(/\s/g,'').length==0){
        msgbox('plz leave some words!');
        setError(msg);
        msg.focus();
        return false;
    }
    var params = {'usrname':usrname.value,'email':email.value,'msg':msg.value};
    aSend('/survey',params,'POST',function(xhr){
        msgbox('Your Info was Submitted!<br>Thank you!');
        setTimeout(function(){
            window.location = '/';
        }, 1000);
    })
    return true;
}
function aCheck(obj,name,val){
    if(name=='email' && !/^\w{2,20}@\w{2,10}\.\w{1,}/.test(val)){
        msgbox('plz enter a correct email');
        setError(email);
        email.focus();
        return false;
    }
    var reqKv = {'sname':name,'sval':val};
    aSend('/check',reqKv,'post',function(xhr){
        if(xhr.responseText=='ok'){
            obj.style.background = '#0f0';
            var span = document.createElement('span');
            span.className="_"+name+"_valid_";
            var div = document.createElement('div');
            obj.style.display = 'inline-block';
            span.innerHTML=val+' is ok!';
            span.style.display="inline-block";
            span.style.marginLeft = '1rem';
            span.style.color='green';
            obj.parentNode.insertBefore(span,obj.nextSibling);
            span.parentNode.insertBefore(div,span.nextSibling);
        }else{
            msgbox('this value is no valid');
            obj.style.background = '#f00';
            obj.focus();
        }
   })

}
setWindowOnload(function(){
    var usrname = $.one('#usrname');
    var email = $.one('#email');
    var msg = $.one('#msg');
    email.onchange = usrname.onchange = function(){
        aCheck(this,this.name,this.value);
    }
});