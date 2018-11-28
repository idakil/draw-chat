var canvas, context, mouse = { x: 0, y: 0 };
let winWidth = 800;
let winHeight = 600;
init();

function init() {
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
    context.beginPath();
    context.moveTo( mouse.x, mouse.y );
    context.lineTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
    context.stroke();
    console.log(context);
    mouse.x = event.pageX - canvas.offsetLeft;
    mouse.y = event.pageY - canvas.offsetTop;
}