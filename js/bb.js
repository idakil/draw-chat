

let word;
let seconds;

let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        console.log(xmlhttp.responseText);
    }
};
xmlhttp.open("GET", "../php/db.php");
xmlhttp.send();


function start() {
    let socket = new WebSocket('ws://localhost:3000');

    conn.onopen = function(e) {
        console.log("Connection established! BBBBB");
    };
    socket.onmessage = function(e) {
        var a = JSON.parse(e.data);
        console.log(a.time);


    };

    setInterval(function(){
        updateTimer();
    }, 1000);

   // document.getElementById("word").innerHTML = word;
}


