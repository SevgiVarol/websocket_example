     const {ping} = require('./tests/ping.js');
     const ping_module = require('./tests/ping.js');
     const sevgi_api = require('./tests/sevgi_api.js');
     const puppeteer = require('puppeteer');
     var page;
     var browser;
     var ip;
    //server side//sunucu oluştur ve dinle
    var http = require('http');
    var count = 0;
    var server = http.createServer(function(request, response) {});
    server.listen(8080, function() {
        console.log((new Date()) + ' Server is listening on port 8080');
    });
    
    /////websocket server oluştur////
    var WebSocketServer = require('websocket').server;
    wsServer = new WebSocketServer({
        httpServer: server
    });
    ////Bağlatıları dinle////
    wsServer.on('request', function(r){
        var connection = r.accept('echo-protocol', r.origin);//bağlantıyı kabul et
        
        var clients = {};
        var id = count++;
        clients[id] = connection;
        console.log((new Date()) + ' Connection accepted [' + id + ']');
        
        
        ////mesaj dinle ve yayınla////(Create event listener)
        connection.on('message', function(event) 
        {
            var ekinoks= require("./tests/ekinoks");
            var data = JSON.parse(event.utf8Data);
            console.log(data);
            var msgString =data.testnum;
            var doc = data.doc;
            var response = data.response;
            var x = false;
            var soru = null;
            if(doc == 1)ip='10.5.176.249'; 
            else if(doc == 2) ip='10.5.177.164';
                      
            if(response != null) sevgi_api.wait_response(response);
              
            ping_control();
            async function ping_control(){
                x = await ping(page,ip);
                console.log("ping x:"+x);
            
                if(!x){
                    for(let k=1 ; !x ; k++){
                        for(var i in clients){
                            var data0 = { "test_no" : null , "question" : null, "bekle" : "Kamera offline Lutfen Bekleyin.. " , "log" : null , "log_modal" : null , "endmodal" :null };
                            var m = JSON.stringify(data0);
                            clients[i].sendUTF(m);
                        }
                        x = await ping(page,ip);
                        await page.waitFor(1000);
                        if(x)
                        {
                            for(var c in clients)
                                {
                                    var end ={"test_no" : null , "question" : null, "bekle" : null, "log" : null , "log_modal" : null , "endmodal" : true }; 
                                    var endrestart = JSON.stringify(end);
                                    clients[c].sendUTF(endrestart);
                                }
                                break;
                        }
                    }
                } 
                else 
                {

                    if(doc == 1)
                    {
                        ekinoks.testEt1(msgString).then((value) => 
                        {
                            for(var i in clients)
                            {
                                var data1 = { "test_no" : msgString , "question" : null, "bekle" : null , "log" : null , "log_modal" : null , "endmodal" :null };
                                var m1 = JSON.stringify(data1);
                                clients[i].sendUTF(m1);
                            }
                        });
            
                        soru_control();
                        async function soru_control(){
                            soru =await sevgi_api.socket_question();
                            if(soru != null){
                                console.log("soru:"+soru);
                                for(var i in clients)
                                {
                                    var data2 = { "test_no" : null , "question" : soru, "bekle" : null , "log" : null , "log_modal" : null , "endmodal" :null };
                                    var m2 = JSON.stringify(data2);
                                    clients[i].sendUTF(m2);
                                }
                        
                                setTimeout(soru_control, 500);
                            }
                            else setTimeout(soru_control, 10);
                        }
                
                        log_control();
                        async function log_control()
                        {
                            log_in =await sevgi_api.socket_log();
                            if(log_in != null)
                            {
                                console.log("log:"+log_in);
                                for(var i in clients)
                                {
                                    var datalog = { "test_no" : null , "question" : null, "bekle" : null , "log" : log_in , "log_modal" : null , "endmodal" :null };
                                    var mlog = JSON.stringify(datalog);
                                    clients[i].sendUTF(mlog);
                                }
                        
                                setTimeout(log_control, 0.01);
                            }
                            else setTimeout(log_control,0);
                        }
                        
                        modal_log_control();
                        async function modal_log_control()
                        {
                            log_modal =await sevgi_api.socket_log_modal();
                            if(log_modal != null)
                            {
                                console.log("log_modal:"+log_modal);
                                for(var i in clients)
                                {
                                    var datalog_modal = { "test_no" : null , "question" : null, "bekle" : null , "log" : null , "log_modal" : log_modal , "endmodal" :null };
                                    var mlog_modal = JSON.stringify(datalog_modal);
                                    clients[i].sendUTF(mlog_modal);
                                }
                        
                                setTimeout(modal_log_control, 1000);
                            }
                            else setTimeout(modal_log_control,0);
                        }
                        cam_restart_control();
                        async function cam_restart_control()
                        {
                            var closed = await ping_module.cam_closing_func();
                            var opened = await ping_module.cam_opening_func();
                            if(closed == 1)
                            {
                                for(let i = 15 ; closed ; i--)
                                { 
                                    for(var j in clients)
                                    {
                                        var data_restart = { "test_no" : null , "question" : null, "bekle" : "Kamera kapanıyor.. "+i+"sn" , "log" : null , "log_modal" : null , "endmodal" :null };
                                        var mrestart = JSON.stringify(data_restart);
                                        clients[j].sendUTF(mrestart);
                                    }
                                    closed = await ping_module.cam_closing_func(); 
                                    await page.waitFor(1000); 
                                    if(closed == 0) break;
                                }
                            }
                            if(opened == 1)
                            {                                
                                for(let i = 168 ; opened ; i--)
                                { 
                                    for(var j in clients)
                                    {
                                        var data_restart = { "test_no" : null , "question" : null, "bekle" : "Kamera açılıyor.. Lütfen bekleyin.. "+i+"sn" , "log" : null , "log_modal" : null , "endmodal" :null };
                                        var mrestart = JSON.stringify(data_restart);
                                        clients[j].sendUTF(mrestart);
                                    }
                                    opened = await ping_module.cam_opening_func(); 
                                    await page.waitFor(1000); 
                                    if(opened == 0)
                                    {
                                        for(var c in clients)
                                        {
                                            var end ={"test_no" : null , "question" : null, "bekle" : null, "log" : null , "log_modal" : null , "endmodal" : true }; 
                                            var endrestart = JSON.stringify(end);
                                            clients[j].sendUTF(endrestart);
                                        }
                                        break;
                                    }
                                }
                            }
                            setTimeout(cam_restart_control, 200);
                            
                        }
                
                    }
                    else if(doc == 2)
                    {
                        ekinoks.testEt2(msgString).then((value) => 
                        {
                            for(var i in clients)
                            {
                                var data2 = { "test_no" : msgString , "question" : null, "bekle" : null , "log" : null , "log_modal" : null , "endmodal" :null};
                                var m2 = JSON.stringify(data2);
                                clients[i].sendUTF(m2);
                            }
                        });
                        soru_control();
                        async function soru_control()
                        {
                            soru =await sevgi_api.socket_question();
                            if(soru != null)
                            {
                                console.log("soru:"+soru);
                                for(var i in clients)
                                {
                                    var data2 = { "test_no" : null , "question" : soru, "bekle" : null , "log" : null , "log_modal" : null , "endmodal" :null };
                                    var m2 = JSON.stringify(data2);
                                    clients[i].sendUTF(m2);
                                }
                        
                                setTimeout(soru_control, 500);
                            }
                            else setTimeout(soru_control, 10);
                        }
                
                        log_control();
                        async function log_control()
                        {
                            log_in =await sevgi_api.socket_log();
                            if(log_in != null)
                            {
                                console.log("log:"+log_in);
                                for(var i in clients)
                                {
                                    var datalog = { "test_no" : null , "question" : null, "bekle" : null , "log" : log_in , "log_modal" : null , "endmodal" :null };
                                    var mlog = JSON.stringify(datalog);
                                    clients[i].sendUTF(mlog);
                                }
                        
                                setTimeout(log_control, 0.2);
                            }
                            else setTimeout(log_control, 0);
                        }
                    }
                }
            }

        });
        
        ////istemcinin bağlantısını kesme////
        connection.on('close', function(reasonCode, description) 
        {
            delete clients[id];
            console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        });
    

        // Code here to run on connection
    });
    let basla = async () => 
    {
         browser = await puppeteer.launch({headless: false});
	 page = await browser.newPage();
         await page.goto("file:///home/sevgi/Documents/WebSocket_Denemesi/index.html", {"waitUntil": "networkidle2"});
         
    }
    basla();
    

    
