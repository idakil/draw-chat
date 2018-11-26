<!DOCTYPE html>
<html>
<head>
    <title>Chat</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
<style>
    body {
        margin: 0;
        padding 0;
    }
</style>
<script>

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
<div id = "chat">
    <form action="?action=send" method="POST">
        <input type="text" name="message">
        <input type="submit" value="Send">
    </form>
    <form action="?action=changeusername" method="POST">
        <input type="text" name="username">
        <input type="submit" value="changeusername">
    </form>
</div>

<div id="draw">
    <canvas>

    </canvas>
</div>

</body>
</html>