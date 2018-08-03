////web socketin yeni örneğini başlat//
        var ws = new WebSocket('ws://127.0.0.1:8080', 'echo-protocol');
        var liste=new Array();
        
        ////sunucuya mesaj gönder////
        function sendMessage1()
        {
            var message = document.getElementById('message_text1').value;
            if(message == "" || message == null) alert("Lütfen yapmak istediğiniz testin numarasını giriniz");
            else
            {
                var data = { "doc" : "1", "testnum" : message , "response" : null };
                var m = JSON.stringify(data);
                ws.send(m);
            }
        }
        
        ////sunucu yanıtını dinle
        ws.addEventListener("message", function(e) 
        {
            var data = JSON.parse(e.data);
            var log = data.log;
            var log_modal = data.log_modal;
            var msg = data.test_no;
            var question = data.question;
            var bekle= data.bekle;
            if(log) console.log(log);
            if(log_modal)
            {
                var modal = document.getElementById('myModal_log');
                var sometext = document.getElementById('sometext_log');
                sometext.innerHTML= log_modal;
                modal.style.display = "block";
                var btn_ok = document.getElementById("ok");
                btn_ok.onclick = function()
                {
                    modal.style.display = "none";
                }
            }
                            
            if(bekle) alert(bekle);
            else if(question)
            {
                // Get the modal
                var modal = document.getElementById('myModal');
                var sometext = document.getElementById('sometext');
                sometext.innerHTML=question;
                modal.style.display = "block";
                var btn_yes = document.getElementById("yes");
                var btn_no = document.getElementById("no");
                btn_yes.onclick = function()
                {
                    modal.style.display = "none";
                    var data = { "doc" : null, "testnum" : null , "response" : "e" };
                    var m = JSON.stringify(data);
                    ws.send(m);
                }
                btn_no.onclick = function() 
                {
                    modal.style.display = "none";
                    var data = { "doc" : null, "testnum" : null , "response" : "h" };
                    var m = JSON.stringify(data);
                    ws.send(m);
                }
                
            }
            else if (msg) alert(msg+". test uygulandı. (Ayrıntılar için consola bakın..)");
        });
        
        function sendMessage2()
        {
            var message = document.getElementById('message_text2').value;
            if(message == "" || message == null) alert("Lütfen yapmak istediğiniz testin numarasını giriniz");
            else
            {
                var data = { "doc" : "2", "testnum" : message , "response" : null };
                var m = JSON.stringify(data);
                try{ws.send(m);} catch(error){alert("hata");}
            }
        }

         ws.addEventListener("close", function(e) {
             var hata_form = document.getElementById('websocket_conn');
             var hata_txt = document.getElementById('conn_text');
             hata_txt.innerHTML="Web Socket'e bağlanırkenken hata oluştu... Lütfen bağlantınızı kontrol edin ve sayfayı yenileyin";
             hata_form.style.display="block";
        });
         
         