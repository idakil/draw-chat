
var canvas, context;

let winWidth = 800;
let winHeight = 600;
var conn;
let mouse = {prevX:0, prevY: 0, x: 0, y: 0 };
init();

function init() {

    conn = new WebSocket('ws://localhost:3000');
    conn.onopen = function(e) {
        console.log("Connection established!");

    };
    canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvas');
    console.log(canvas);
    canvas.width = winWidth;
    canvas.height = winHeight;
    canvas.style.cursor = 'crosshair';
    context = canvas.getContext( '2d' );
    context.strokeStyle = 'rgb(0,0,0)';
    context.lineWidth = 2;
    canvas.addEventListener( 'mousedown', onDocumentMouseDown, false );
    canvas.addEventListener( 'mouseup', onDocumentMouseUp, false );
    document.getElementById('draw').appendChild(canvas);

    conn.onmessage = function(e) {
        //console.log(e.data);
        var a = JSON.parse(e.data);

        updateCanvas(a.prevX, a.prevY, a.x, a.y);
    };
}
function onDocumentMouseDown( event ) {

    //console.log(prevX + " " + prevY);
    mouse.x = event.pageX - canvas.offsetLeft;
    mouse.y = event.pageY - canvas.offsetTop;
    mouse.prevX = mouse.x;
    mouse.prevY = mouse.y;
    //console.log(prevX + " " + prevY + "after" + mouse.x + " " + mouse.y);

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
}

function onDocumentMouseUp( event ) {
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
}

function onDocumentMouseMove( event ) {
   //var httpc = new XMLHttpRequest();
    context.beginPath();
    context.moveTo( mouse.x, mouse.y );
    context.lineTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
    context.stroke();
    mouse.x = event.pageX - canvas.offsetLeft;
    mouse.y = event.pageY - canvas.offsetTop;

   conn.send(JSON.stringify(mouse));
   mouse.prevX = mouse.x;
   mouse.prevY = mouse.y;


    /*var url = "../php/draw.php?x="+mouse.x+"&y="+mouse.y;
    httpc.open("GET", url, true); // sending


    httpc.onreadystatechange = function() { //Call a function when the state changes.
        if(httpc.readyState === 4 && httpc.status === 200) {
            updateCanvas();
        }
    };
    httpc.send();*/
}
function updateCanvas(prevX, prevY, x, y){

    context.beginPath();
    context.moveTo(prevX, prevY);
    context.lineTo(x, y);
    context.stroke();
    //console.log(prevX + " " + prevY + "update");
    /*prevX = x - canvas.offsetLeft;
    prevY = y - canvas.offsetTop;*/
    /* source.onmessage = function(event) {
         document.getElementById("counter").innerHTML = event.data + "<br>";
         console.log(event.data);
     };

   /*
     var sendinfo = {
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
     })
     //var url = "../php/draw.php?x="+mouse.x+"&y="+mouse.y;
     //httpc.open("GET", url, true); // sending


    httpc.onreadystatechange = function() { //Call a function when the state changes.
         if(httpc.readyState == 4 && httpc.status == 200) { // complete and no errors
             console.log(httpc.responseText);
             var a = JSON.parse(httpc.responseText);
             context.beginPath();
             console.log('mousex' + mouse.x + " y " + mouse.y);
             context.moveTo( mouse.x, mouse.y );
             context.lineTo(a.x - canvas.offsetLeft, a.y - canvas.offsetTop);
             context.stroke();
             mouse.x = a.pageX - canvas.offsetLeft;
             mouse.y = a.pageY - canvas.offsetTop;
         }
     };
     var url = "../php/draw.php?x="+mouse.x+"&y="+mouse.y;
     httpc.open("GET", url, true); // sending
     httpc.send();*/
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}