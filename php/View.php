<!DOCTYPE html>
<html>
<head>
    <title>Chat</title>
</head>
<body>
<style>
    body {
        margin: 0;
        padding 0;
    }
</style>
<script>
    var canvas, context, mouse = { x: 0, y: 0 };
    init();
    function init() {
        canvas = document.createElement( 'canvas' );
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.cursor = 'crosshair';
        context = canvas.getContext( '2d' );
        context.strokeStyle = 'rgb(0,0,0)';
        context.lineWidth = 0.5;
        document.addEventListener( 'mousedown', onDocumentMouseDown, false );
        document.addEventListener( 'mouseup', onDocumentMouseUp, false );
        document.body.appendChild( canvas );
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
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    }
</script>
<h1>Chat</h1>
<?php

if (empty($this->messages)) {
    echo "There are no messages in chat...";
} else {
    foreach ($this->messages as $message) {
        echo htmlspecialchars($message) . "<br>";
    }
}
?>
<h2>New message</h2>
<form action="?action=send" method="POST">
    <input type="text" name="message">
    <input type="submit" value="Send">
</form>
<form action="?action=changeusername" method="POST">
    <input type="text" name="username">
    <input type="submit" value="changeusername">
</form>
</body>
</html>