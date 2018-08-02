////web socketin yeni örneğini başlat//
        var ws = new WebSocket('ws://127.0.0.1:8080', 'echo-protocol');
        var liste=new Array();
        ////sunucuya mesaj gönder////
        function sendMessage1(){
            var message = document.getElementById('message_text1').value;
            if(message == "" || message == null) alert("Lütfen yapmak istediğiniz testin numarasını giriniz");
            else{
                var data = { "doc" : "1", "testnum" : message , "response" : null };
                var m = JSON.stringify(data);
                ws.send(m);
            }
        }
        
        ////sunucu yanıtını dinle
        ws.addEventListener("message", function(e) {
            var data = JSON.parse(e.data);
            console.log(data.log);
            var msg = data.test_no;
            var question = data.question;
            var bekle= data.bekle;
            if(bekle) alert(bekle);
            else if(question){
                //var response = null;
                // Get the modal
                var modal = document.getElementById('myModal');
                var sometext = document.getElementById('sometext');
                sometext.innerHTML=question;
                modal.style.display = "block";
                var btn_yes = document.getElementById("yes");
                var btn_no = document.getElementById("no");
                btn_yes.onclick = function() {
                   // response = "e";
                    modal.style.display = "none";
                    var data = { "doc" : null, "testnum" : null , "response" : "e" };
                    var m = JSON.stringify(data);
                    ws.send(m);
                }
                btn_no.onclick = function() {
                    //response = "h";
                    modal.style.display = "none";
                    var data = { "doc" : null, "testnum" : null , "response" : "h" };
                    var m = JSON.stringify(data);
                    ws.send(m);
                }
                
            }
            else alert(msg+". test uygulandı. (Ayrıntılar için consola bakın..)")
        });
        
        function sendMessage2(){
            var message = document.getElementById('message_text2').value;
            if(message == "" || message == null) alert("Lütfen yapmak istediğiniz testin numarasını giriniz");
            else{
                var data = { "doc" : "2", "testnum" : message , "response" : null };
                var m = JSON.stringify(data);
                ws.send(m);
            }
        }
