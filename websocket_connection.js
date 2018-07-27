////web socketin yeni örneğini başlat//
        var ws = new WebSocket('ws://127.0.0.1:8080', 'echo-protocol');
        ////sunucuya mesaj gönder////
        function sendMessage(){
            var message = document.getElementById('message_text').value;
            ws.send(message);
        }
        ////sunucu yanıtını dinle
        ws.addEventListener("message", function(e) {
            var msg = e.data;
            document.getElementById('chatlog').innerHTML += '<br>' + msg;
        });
    
