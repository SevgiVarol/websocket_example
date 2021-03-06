var sevgi_api= require('./sevgi_api'); 
const fs = require('fs');
const child_process = require("child_process");

(function() {
    module.exports.watch_rtsp =function(url,stream,set){
        var command= "vlc rtsp://"+url+"/"+stream+" --run-time 15 vlc://quit";
        if(set==1){
        console.log("RTSP doğrulaması için User Name:admin ve Password:admin girip OK butonuna basınız.. ");
        sevgi_api.console_log("");}
        child_process.execSync(command);
        sevgi_api.console_log("");
        sevgi_api.console_log("GÖRÜNTÜ AÇILDI");
        
    }
       
    module.exports.record =  function(ip,stream,test_num)
        {
            try {
            sevgi_api.console_log(ip);
            var command = "ffmpeg -hide_banner -v quiet -y -i rtsp://admin:admin@"+ip+"/"+stream+" -acodec copy -t 00:00:05 -vcodec copy "+test_num+".mp4";
            child_process.execSync(command);
            } catch(err){sevgi_api.console_log("Bağlantı Hatası"); return 0; }
                
            }
        
    module.exports.create_json = function(ip,stream,test_num)
        {
            var command = "ffprobe -v quiet -print_format json -show_entries stream=avg_frame_rate -show_format -show_streams "+test_num+".mp4 > "+"specs_test"+test_num+".json"+" 2>&1";
            child_process.execSync(command);     
        }
        
    module.exports.write = function(command)
        {
           var buffer = child_process.execSync(command);
           return buffer.toString();
        }
       
    module.exports.read_specs = function(setting,test_num)
        {   
            var json_name = "specs_test"+test_num+".json";
            var contents = fs.readFileSync(json_name);  
            var jsonContent = JSON.parse(contents);
            var ffmpeg_spec = jsonContent["streams"][0][setting];
            return ffmpeg_spec;
        }    
}());



 
