 (function() {
     var question = require("./question");
     var control;
     var window_question = null;
     var window_log = null;
     var window_log_modal = null;
     var response = null;
        ////////testler web üzerinden mi yoksa konsoldan mı yapılıyor
	module.exports.set_control = async function(c) {
            control=c;
        }
        
        ///////question ask' in web page de gösterilmesi ve sonucun (e/h) beklenmesi
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
                        await delay(10);
                        //console.log("bekleniyor");
                }
            }
            else if(control==0) { 
                return question.ask(qstr);
            }
        }
	
	module.exports.socket_question = async function () {
            return window_question;
            
        }
        module.exports.wait_response = async function (res) {
            console.log("response değişkeni:"+res+" olarak dödürüldü")
            return response = res;
        }
        
        //////// web page consol da logların gösterilmesi
        module.exports.console_log = async function(txt) {
            if(control==1){
                window_log = txt;
                setTimeout(function(){window_log = null;},0.001);
                
            }
            else if(control==0) { 
                return console.log(txt);
            }
        }
        module.exports.socket_log = async function () {
            return window_log;
            
        }
        /////////modal içinde gösterilecek loglar
        module.exports.log_modal = async function(txt) {
            if(control==1){
                window_log_modal = txt;
                setTimeout(function(){window_log_modal = null;},100);
                
            }
            else if(control==0) { 
                return console.log(txt);
            }
        }
        module.exports.socket_log_modal = async function () {
            return window_log_modal;
            
        }
}());

