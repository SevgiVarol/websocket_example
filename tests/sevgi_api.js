 (function() {
     var question = require("./question");
     var control;
     var window_question = null;
     var window_log = null;
     var response = null;
	
	module.exports.question_ask = async function(qstr) {
            if(control==1){
                window_question = qstr;
                async function delay(delayInms) {
                    return new Promise(resolve  => {
                        setTimeout(() => {
                        resolve(2);
                        }, delayInms);
                    });
                }
                for(let i=0 ; 1 ;i++){
                    if(typeof response !== "undefined" && response != null ){console.log("response:"+response);
                        window_question = null;
                        console.log("sorunun cevabı gönderiliyor(response):"+response);
                         var sonuc = response ; response= null; return sonuc; break;}
                        await delay(1000);
                        console.log("bekleniyor");
                }
            }
            else if(control==0) { 
                return question.ask(qstr);
            }
        }
	module.exports.set_control = async function(c) {
            control=c;
        }
	module.exports.socket_question = async function () {
            return window_question;
            
        }
        module.exports.wait_response = async function (res) {
            console.log("response değişkeni:"+res+" olarak dödürüldü")
            return response = res;
        }
        
        
        module.exports.console_log = async function(txt) {
            if(control==1){
                window_log = txt;
            }
            else if(control==0) { 
                return console.log(txt);
            }
        }
        module.exports.socket_log = async function () {
            return window_log;
            
        }
}());

