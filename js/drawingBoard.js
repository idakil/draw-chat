var canvas, context, mouse = { x: 0, y: 0 };
let winWidth = 800;
let winHeight = 600;
init();

function init() {
    canvas = document.createElement('canvas');

    console.log(canvas);
    canvas.width = winWidth;
    canvas.height = winHeight;
    canvas.style.cursor = 'crosshair';
    context = canvas.getContext( '2d' );
    context.strokeStyle = 'rgb(0,0,0)';
    context.lineWidth = 0.5;
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    //document.body.appendChild( canvas );
    document.getElementById('draw').appendChild(canvas);
}
function onDocumentMouseDown( event ) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
}
function onDocumentMouseUp( event ) {
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
}
function onDocumentMouseMove( event ) {
    context.beginPath();
    context.moveTo( mouse.x, mouse.y );
    context.lineTo( event.clientX, event.clientY );
    context.stroke();
    console.log(context);
    mouse.x = event.clientX;
    mouse.y = event.clientY;
}