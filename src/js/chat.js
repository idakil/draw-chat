(function(){

    let user;
    let messages = [];
    let messages_template = Handlebars.compile($('#messages-template').html());

    // Päivittää messages-arrayn ja näyttää viestit
    function updateMessages(msg){
        messages.push(msg);
        let messages_html = messages_template({'messages': messages});
        $('#message-area').html(messages_html);
    }

    // Luodaan WebSocket
    let conn = new WebSocket('ws://localhost:3000');
    //Kun WebSocket yhteys avattu
    conn.onopen = function(e) {
        console.log("Connection established!");
    };

    // Tarkistetaan onko saapuva viesti msg.text olemassa,
    // jos ei niin viesti tarkoitettu piirtoalustalle
    conn.onmessage = function(e) {
        let msg = JSON.parse(e.data);
        if(msg.text){
            updateMessages(msg);
        }
    };

    // Kysytään käyttäjältä käyttäjänimi
    user = prompt("Enter your chat name:", "Guest");

    // Käyttäjänimi on Guest jos käyttäjä ei aseta arvoa
    if (!user || user === ' ') {
        user = "Guest";
    }

    // Poistetaan tägit
    user = user.replace(/(<([^>]+)>)/ig,"");

    // Send-napille evenlistener
    $('#send').click(function(){
        let text = $('#sendbox').val();
        let msg = {
            'user': user,
            'text': text,
            'time': moment().format('hh:mma')
        };
        updateMessages(msg);
        conn.send(JSON.stringify(msg));

        $('#sendbox').val('');
    });

    // Eventlistener alueelle, johon kirjoitetaan viestiä, jos
    // näppäin on enter (keycode on 13), lähetä viesti
    $('#sendbox').keyup(function(e) {
        if (e.which === 13 ) {
            let text = $('#sendbox').val();
            let msg = {
                'user': user,
                'text': text,
                'time': moment().format('hh:mma')
            };
            updateMessages(msg);
            conn.send(JSON.stringify(msg));

            $('#sendbox').val('');
        }
    });

})();