
let canvas, context;
let winWidth = 800;
let winHeight = 600;
let conn;
let col = "rgb(0,0,0)";
let size = 2;
let mouse = {prevX:0, prevY: 0, x: 0, y: 0, color: col, strokeSize: size};

init();

function init() {
    conn = new WebSocket('ws://localhost:3000');
    conn.onopen = function() {
        console.log("Connection established!");
    };
    canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvas');
    canvas.width = winWidth;
    canvas.height = winHeight;
    canvas.style.cursor = 'crosshair';
    context = canvas.getContext( '2d' );
    context.strokeStyle = col;
    context.lineWidth = size;
    canvas.addEventListener( 'mousedown', onDocumentMouseDown, false );
    canvas.addEventListener( 'mouseup', onDocumentMouseUp, false );
    document.getElementById('draw').appendChild(canvas);

    conn.onmessage = function(e) {
        let a = JSON.parse(e.data);
        updateCanvas(a.prevX, a.prevY, a.x, a.y, a.color, a.strokeSize);
        if (a.empty === 1) {

            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    };
}

function onDocumentMouseDown( event ) {
    mouse.x = event.pageX - canvas.offsetLeft;
    mouse.y = event.pageY - canvas.offsetTop;
    mouse.prevX = mouse.x;
    mouse.prevY = mouse.y;
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
}

function onDocumentMouseUp() {
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
}

function onDocumentMouseMove( event ) {
    context.beginPath();
    context.moveTo( mouse.x, mouse.y );
    context.lineTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
    context.stroke();
    mouse.x = event.pageX - canvas.offsetLeft;
    mouse.y = event.pageY - canvas.offsetTop;

   conn.send(JSON.stringify(mouse));
   mouse.prevX = mouse.x;
   mouse.prevY = mouse.y;
}
function updateCanvas(prevX, prevY, x, y, col, size){
    context.strokeStyle = col;
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(prevX, prevY);
    context.lineTo(x, y);
    context.stroke();
}

document.getElementById("red").addEventListener('click', function(){
    changeColor(this);
});
document.getElementById("black").addEventListener('click', function(){
    changeColor(this);
});
document.getElementById("green").addEventListener('click', function(){
    changeColor(this);
});
document.getElementById("yellow").addEventListener('click', function(){
    changeColor(this);
});
document.getElementById("blue").addEventListener('click', function(){
    changeColor(this);
});
document.getElementById("pink").addEventListener('click', function(){
    changeColor(this);
});
document.getElementById("purple").addEventListener('click', function(){
    changeColor(this);
});
document.getElementById("eraser").addEventListener('click', function(){
    changeColor(this);
});

function changeColor(x) {
let c = x.id;
switch (c) {
    case "red":
        col = "rgb(255,0,0)";
        context.strokeStyle = col;
        mouse.color = col;
        break;
    case "black":
        col = "rgb(0,0,0)";
        context.strokeStyle = col;
        mouse.color = col;
        break;
    case "green":
        col = "rgb(3,158,3)";
        context.strokeStyle = col;
        mouse.color = col;
        break;
    case "yellow":
        col = "rgb(250,245,5)";
        context.strokeStyle = col;
        mouse.color = col;
        break;
    case "blue":
        col = "rgb(0,0,255)";
        context.strokeStyle = col;
        mouse.color = col;
        break;
    case "pink":
        col = "rgb(255,38,171)";
        context.strokeStyle = col;
        mouse.color = col;
        break;
    case "purple":
        col = "rgb(127,0,165)";
        context.strokeStyle = col;
        mouse.color = col;
        break;
    case "eraser":
        col="rgb(255,255,255)";
        context.strokeStyle = col;
        mouse.color = col;
        context.lineWidth = context.lineWidth*2;
        mouse.strokeSize = context.lineWidth;
        break;
}
}

let slider = document.getElementById("strokeRange");

slider.oninput = function(){
    context.lineWidth = slider.value;
    mouse.strokeSize = slider.value;
};

function clearCanvas() {
    let o = {empty: 1};
    conn.send(JSON.stringify(o));
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function saveImage() {
    //let imageName = document.getElementById("name").value;
    //console.log(imageName);
    let hr = new XMLHttpRequest();
    let url = "../php/db.php";
    let data = "dataurl="+canvas.toDataURL("image/png");
    //let data2 = {dataurl:(canvas.toDataURL("image/png"))};
    //data = encodeURI(data);
    hr.open("POST", url);

    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
        if(hr.readyState === 4 && hr.status === 200) {
            console.log("sent");

        }
    };
    hr.send(data);
    clearCanvas();
}

function loadImage() {

    let hr = new XMLHttpRequest();
    let url = "../php/fromDB.php";

    let ok = "ok=ok";

    hr.addEventListener("error", function (event) {
        event.preventDefault();
        console.log("error");
    });

    hr.open("POST", url);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    hr.onreadystatechange = function () {
        if (hr.readyState === 4 && hr.status === 200) {
            clearCanvas();
            let dataur = hr.responseText.replace(/\s/g, "+");
            let img = new Image;
            img.onload = function () {
                context.drawImage(img, 0, 0);
            };
            img.src = dataur;
        }
    };

    hr.send(ok);
}

