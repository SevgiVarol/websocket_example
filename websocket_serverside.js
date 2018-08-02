     const {ping} = require('./tests/ping.js');
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
        connection.on('message', function(event) {
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
            ping(page,ip).then((value) => { x= value; console.log("ping x:"+value);
            
            if(!x){
                for(var i in clients){
                    var data0 = { "test_no" : null , "question" : null, "bekle" : "Kamera offline Lutfen Bekleyin" , "log" : null };
                    var m = JSON.stringify(data0);
                    console.log(m);
                    clients[i].sendUTF(m);
                }
            } else   {

            if(doc == 1){ekinoks.testEt1(msgString).then((value) => {
                    for(var i in clients){
                        var data1 = { "test_no" : msgString , "question" : null, "bekle" : null , "log" : null };
                        var m1 = JSON.stringify(data1);
                        clients[i].sendUTF(m1);
                    }
                });
            
                soru_control();
                async function soru_control(){
                    soru =await sevgi_api.socket_question();
                    if(soru != null){
                        console.log("soru:"+soru);
                        for(var i in clients){
                            var data2 = { "test_no" : null , "question" : soru, "bekle" : null , "log" : null  };
                            var m2 = JSON.stringify(data2);
                            clients[i].sendUTF(m2);
                        }
                        
                        setTimeout(soru_control, 1000);
                    }
                    else setTimeout(soru_control, 10);
                }
                
                log_control();
                async function log_control(){
                    log =await sevgi_api.socket_log();
                    if(log != null){
                        console.log("log:"+log);
                        for(var i in clients){
                            var datalog = { "test_no" : null , "question" : null, "bekle" : null , "log" : log };
                            var mlog = JSON.stringify(datalog);
                            clients[i].sendUTF(mlog);
                        }
                        
                        setTimeout(log_control, 1000);
                    }
                    else setTimeout(log_control, 10);
                }
                
            }
            else if(doc == 2){ekinoks.testEt2(msgString).then((value) => {
                    for(var i in clients){
                        var data2 = { "test_no" : msgString , "question" : null, "bekle" : null , "log" : null  };
                        var m2 = JSON.stringify(data2);
                        clients[i].sendUTF(m2);
                    }
                });
                soru_control();
                async function soru_control(){
                    soru =await sevgi_api.socket_question();
                    if(soru != null){
                        console.log("soru:"+soru);
                        for(var i in clients){
                            var data2 = { "test_no" : null , "question" : soru, "bekle" : null , "log" : null  };
                            var m2 = JSON.stringify(data2);
                            clients[i].sendUTF(m2);
                        }
                        
                        setTimeout(soru_control, 1000);
                    }
                    else setTimeout(soru_control, 10);
                }
                
                log_control();
                async function log_control(){
                    log =await sevgi_api.socket_log();
                    if(log != null){
                        console.log("log:"+log);
                        for(var i in clients){
                            var datalog = { "test_no" : null , "question" : null, "bekle" : null , "log" : log };
                            var mlog = JSON.stringify(datalog);
                            clients[i].sendUTF(mlog);
                        }
                        
                        setTimeout(log_control, 1000);
                    }
                    else setTimeout(log_control, 10);
                }
                
            }}});

        });
        
        ////istemcinin bağlantısını kesme////
        connection.on('close', function(reasonCode, description) {
            delete clients[id];
            console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        });
    

        // Code here to run on connection
    });
    let basla = async () => {
         browser = await puppeteer.launch({headless: false});
	 page = await browser.newPage();
         await page.goto("file:///home/sevgi/Documents/WebSocket_Denemesi/index.html", {"waitUntil": "networkidle2"});
         
    }
    basla();
    

    
