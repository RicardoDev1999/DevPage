let boxes = [];
var easyCam;

setup = function () {
    createCanvas($(window).width(), $(window).height() / 2, WEBGL);
    boxes.push(new Box($(window).width() / 4 * 0.5, 200, 64, 50));
    boxes.push(new Box($(window).width() / 4 * 1.5, 200, 64, 100));
    boxes.push(new Box($(window).width() / 4 * 2.5, 200, 64, 150));
    boxes.push(new Box($(window).width() / 4 * 3.5, 200, 64, 200));
}

draw = function () {
    clear();
    for (let index = 0; index < boxes.length; index++) {
        let box = boxes[index];
        box.show();
    }
}

mousePressed = function(){
    boxes.forEach(b =>{
        if(b.mouseHover()){
            b.threeDimensional = !b.threeDimensional;
        }
    });
}

mouseWheel  = function(e){
    let sizeDelta = e.delta / 6;
    boxes.forEach(b =>{
        if(b.mouseHover()){
            if(b.size - sizeDelta > b.minSize){
                b.size -= sizeDelta;
            }
            if(b.size > b.maxSize) {
                b.size = b.maxSize;
            }
        }
    });
}

class Box {
    constructor(x, y, s, c) {
        this.size = s;
        this.x = x;
        this.y = y;
        this.maxSize = s * 2;
        this.minSize = Math.abs(s / 2);
        this.color = c;
        this.threeDimensional = false;
    }
    show() {
        push()
        fill(this.color);
        translate(this.x - width / 2, this.y - height / 2);

        let localSize = this.size;

        if (this.threeDimensional) {
            rotateY(mouseX * 0.01);
            rotateX(mouseY * 0.01);
            box(localSize);
        }
        else {
            rect(-(localSize / 2), -(localSize / 2), localSize, localSize);
        }

        pop();
    }
    mouseHover() {
        var d = dist(mouseX, mouseY , this.x - (this.size / 2), this.y - (this.size / 2));
        if (d < this.size) {
            return true;
        }
        else {
            return false;
        }
    }
}

