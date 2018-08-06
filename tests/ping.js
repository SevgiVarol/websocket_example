var tcpp = require('tcp-ping');
var login = require("./login");
var return_value;
var cam_closing = null;
var cam_opening = null;

module.exports.ping = async function(page,ip)
{
   tcpp.probe(ip, 8080, function(err, available) {
    return_value = available;
}); 
 while(return_value === undefined)
 await page.waitFor(100);
 return return_value;
}
async function ping(page,ip)
{
   tcpp.probe(ip, 8080, function(err, available) {
    return_value = available;
}); 
 while(return_value === undefined)
 await page.waitFor(100);
 return return_value;
}

module.exports.camera_restart = async function (page,ip)
{   var if_close = 0;
    x=1;
    cam_closing = 1;
    for(let i=15;x;i--) {
                x = await ping (page,ip);
                    await page.waitFor(1000);
                console.clear();
                console.log("Kamera kapanıyor. Lütfen bekleyin... "+i);
                if(i==0) break;
                }
                cam_closing = 0;
                console.log("Kamera Kapandı.")
                await page.waitFor(1000);
                cam_opening = 1;
                for(let i=0; !x; i++)++++++++++
                
                {x = await ping (page,ip);
                    await page.waitFor(1000);
                console.clear();
                console.log("Kamera açılıyor.. Lütfen bekleyin.. "+i+"sn");
                if_close=1;
                }
                cam_opening = 0;
                console.log("Kamera açıldı.")
                if(if_close)
                await login.loginCamera(page,ip);
}
module.exports.cam_closing_func = async function () {return cam_closing;}
module.exports.cam_opening_func = async function () {return cam_opening;}