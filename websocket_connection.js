////web socketin yeni örneğini başlat//
        var ws = new WebSocket('ws://127.0.0.1:8080', 'echo-protocol');
        var liste=new Array();
        ////sunucuya mesaj gönder////
        function sendMessage1(){
            var message = document.getElementById('message_text1').value;
            if(message == "" || message == null) alert("Lütfen yapmak istediğiniz testin numarasını giriniz");
            else{
                var data = { "doc" : "1", "testnum" : message };
                var m = JSON.stringify(data);
                ws.send(m);
            }
        }
        
        ////sunucu yanıtını dinle
        ws.addEventListener("message", function(e) {
            var msg = e.data;
            alert(msg+". test uygulandı")
        });
        
        function sendMessage2(){
            var message = document.getElementById('message_text2').value;
            if(message == "" || message == null) alert("Lütfen yapmak istediğiniz testin numarasını giriniz");
            else{
                var data = { "doc" : "2", "testnum" : message };
                var m = JSON.stringify(data);
                ws.send(m);
            }
        }
        
        (function () {
            var old = console.log;
            var logger = document.getElementById('results1');
            console.log = function (message) {
                if (typeof message == 'object') {
                    logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
                } else {
                    logger.innerHTML += message + '<br />';
                }
            }
        })();

    
