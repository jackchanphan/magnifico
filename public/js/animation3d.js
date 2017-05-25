function init3dBox() {
    var boxes = $('.box-3d');
    var content = $('.content-3d');
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].style.transformStyle = "preserve-3d";
        boxes[i].style.perspective = "8000";
        boxes[i].rotateCnt = 0;
        boxes[i].subBox = $.one('.sub-box', boxes[i]);
        boxes[i].subBox.style.transformStyle = "preserve-3d";
        boxes[i].index = i;
        boxes[i].style.transition = "all 2s";
        var children = boxes[i].children[0].children;
        boxes[i].fastChildren = children;
        for (var k = 0; k < children.length; k++) {
            children[k].index = k;
            children[k].style.transition = "all .5s";
            children[k].onmouseover = function() {
                var transformStr = this.style.transform || getStyle(this, 'transform');
                this.oriTransform = transformStr;
                this.style.border = "2px solid red";
                this.style.transform = transformStr + " scale(1.2)";
                for (var s = 0; s < this.parentNode.children.length; s++) {
                    if (this.parentNode.children[s] != this) {
                        this.parentNode.children[s].style.opacity = ".7";
                    }
                }
            }
            children[k].onmouseout = function() {
                this.style.transform = this.oriTransform;
                this.style.border = '';
                this.style.opacity = "1";
                for (var s = 0; s < this.parentNode.children.length; s++) {
                    this.parentNode.children[s].style.opacity = "1";
                }
            }
            children[k].onclick = function() {
                for (var s = 0; s < content.length; s++) {
                    content[s].style.display = "none";
                }
                content[this.index].style.display = 'block';
                this.parentNode.parentNode.lastTransformY = "rotateY(-" + (this.index * (120)) + "deg)";
                this.parentNode.parentNode.style.transform = "rotateY(-" + (this.index * (120)) + "deg)";
            }
        }
        boxes[i].onmouseenter = function() {
            this.style.transform = "rotateX(15deg)" + this.lastTransformY;
        }
    }
}
setWindowOnload(init3dBox);