
var canvas, context, mouse = { x: 0, y: 0 };
let winWidth = 800;
let winHeight = 600;
init();

function init() {
    var jotain = new WebSocket("ws://localhost:63342/ourawesomeproject");
    console.log(jotain.readyState);
    jotain.onopen = function (event) {
        jotain.send("jotain");
    };
    canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvas');
    console.log(canvas);
    canvas.width = winWidth;
    canvas.height = winHeight;
    canvas.style.cursor = 'crosshair';
    context = canvas.getContext( '2d' );
    context.strokeStyle = 'rgb(0,0,0)';
    context.lineWidth = 0.5;
    canvas.addEventListener( 'mousedown', onDocumentMouseDown, false );
    canvas.addEventListener( 'mouseup', onDocumentMouseUp, false );
    document.getElementById('draw').appendChild(canvas);
}
function onDocumentMouseDown( event ) {
    mouse.x = event.pageX - canvas.offsetLeft;
    mouse.y = event.pageY - canvas.offsetTop;
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
}

function onDocumentMouseUp( event ) {
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
}

function onDocumentMouseMove( event ) {
    var httpc = new XMLHttpRequest();
    context.beginPath();
    context.moveTo( mouse.x, mouse.y );
    context.lineTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
    context.stroke();
    mouse.x = event.pageX - canvas.offsetLeft;
    mouse.y = event.pageY - canvas.offsetTop;
    var url = "../php/draw.php?x="+mouse.x+"&y="+mouse.y;
    httpc.open("GET", url, true); // sending


    httpc.onreadystatechange = function() { //Call a function when the state changes.
        if(httpc.readyState == 4 && httpc.status == 200) { // complete and no errors
            // some processing here, or whatever you want to do with the response

        }
    };
    httpc.send();
}
function updateCanvas(){
    //var httpc = new XMLHttpRequest();

    console.log('KUTUTTU');
    jotain.onmessage = function (event) {
        console.log(event.data);
    }
    /*var sendinfo = {
        x: mouse.x,
        y: mouse.y
    };
    $.ajax({
        type: "POST",
        url: "../php/draw.php",
        dataType: JSON,
        data: sendinfo,
        success: function (data) {
            var parsettu = JSON.parse(data);
            context.beginPath();
            context.moveTo( mouse.x, mouse.y );
            context.lineTo(parsettu.x, parsettu.y);
        }
    })*/
    //var url = "../php/draw.php?x="+mouse.x+"&y="+mouse.y;
    //httpc.open("GET", url, true); // sending

    /*httpc.onreadystatechange = function() { //Call a function when the state changes.
        if(httpc.readyState == 4 && httpc.status == 200) { // complete and no errors
            context.beginPath();
            console.log('ok');
            context.lineTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
            context.moveTo( mouse.x, mouse.y );
            context.stroke();
            // some processing here, or whatever you want to do with the response
        }
    };
    httpc.send();*/
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}