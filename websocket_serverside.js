    var ekinoks= require("./tests/ekinoks");
    //server side//sunucu oluştur ve dinle
    var http = require('http');
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
        var count = 0;
        var clients = {};
        var id = count++;
        clients[id] = connection;
        console.log((new Date()) + ' Connection accepted [' + id + ']');
        
        
        ////mesaj dinle ve yayınla////(Create event listener)
        connection.on('message', function(event) {
            console.log(event);
            
            var data = JSON.parse(event.utf8Data);
            console.log(data);
            var msgString =data.testnum;
            var doc = data.doc;
            //console.log("mesaj:"+msgString+" doc:"+doc);
            if(doc == 1){ ekinoks.testEt1(msgString).then((value) => {
                for(var i in clients){
                clients[i].sendUTF(msgString);
                }
            });
            }
            else if(doc == 2){ ekinoks.testEt2(msgString).then((value) => {
                for(var i in clients){
                clients[i].sendUTF(msgString);
                }
            });
                
            }
            else console.log(doc+" okunamadı")
            

        });
        
        ////istemcinin bağlantısını kesme////
        connection.on('close', function(reasonCode, description) {
            delete clients[id];
            console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        });
    

        // Code here to run on connection
    });
    

    
