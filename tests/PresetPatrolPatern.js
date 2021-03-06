var readline = require('readline');
var sevgi_api= require('./sevgi_api');
(function() {
        const PRESET_INDEX_SELECTOR = '#preset';
        const PRESET_NAME_SELECTOR = '#presetTag';
        const PRESET_SAVE_SELECTOR = '#button_s';
        const PRESET_DELETE_SELECTOR = '#button_d';
        const PRESET_GO_SELECTOR = '#button_g';
        const PRESET_GOTO_HOME_CHECKBOX_SELECTOR = '#self_goto_home';
        const PRESET_GOTO_HOME_SELECTOR = '#home_timeout';
        const PATROL_NAME_SELECTOR = '#patrol';
        const PATROL_PRESET_LIST = '#patrol_list';
        const PATROL_TIME_RANGE_SELECTOR = '#patrol_interval';
        const PATROL_RUN_SELECTOR = '#patrol_run';
        const PATROL_STOP_SELECTOR = '#patrol_stop';
        const PATROL_SAVE_SELECTOR ='#patrol_save';
        const PATROL_DELETE_SELECTOR = '#patrol_delete';
        const DOM_HORIZONTAL_SELECTOR = '#set_h_pos';
        const DOM_VERTICAL_SELECTOR = '#set_v_pos';
        const DOM_ZOOM_SELECTOR = '#set_zoom';
        const DOM_APPLY_LOCATION_SELECTOR = '#t01 > tbody > tr:nth-child(7) > td:nth-child(2) > button';
        const PTZ_RIGHT_SELECTOR = '#t01 > tbody > tr:nth-child(6) > td:nth-child(1) > table > tbody > tr > td:nth-child(1) > p:nth-child(3) > button:nth-child(4)';
        const PRESET_GOTO_HOME_CHECKBOX_SELECTOR_UP = '#t01 > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(2)';
        const PRESET_GOTO_HOME_SAVE_BUTTON = '#t01 > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(2) > #save_home';
        
        module.exports.set_preset= async function(page){
            var horizontal = ["0","24000","12000"];
            var vertical = ["9000","0","4500"];
            sevgi_api.console_log("Presetler siliniyor..")
            for(let clear=0; clear<3; clear++)
            {   await page.waitFor(1000);
                await page.click(PRESET_INDEX_SELECTOR);
                                await page.waitFor(1500);

                for (let i = 0; i < 10; i++)
                await page.keyboard.down('Backspace');
                await page.keyboard.type(clear.toString());
                await page.keyboard.press('Enter');
                await page.waitFor(1500);
                await page.click(PRESET_DELETE_SELECTOR);
                
            }
            sevgi_api.console_log("Presetler silindi.");
            for(let index = 0; index<3; index++)
                
            {   
                sevgi_api.console_log("Preset "+(index+1)+" ayarlanıyor..")
                ////YATAY KONUMU GİR
                await page.click(DOM_HORIZONTAL_SELECTOR);
                await page.waitFor(1000);
                for (let i = 0; i < 10; i++)
                    await page.keyboard.down('Backspace');
                await page.keyboard.type(horizontal[index]);
                ////DIKEY KONUMU GIR
                await page.click(DOM_VERTICAL_SELECTOR);
                await page.waitFor(1000);
                for (let i = 0; i < 10; i++)
                    await page.keyboard.down('Backspace');
                await page.keyboard.type(vertical[index]);
                await page.waitFor(1000);
                ////KONUMA GIT
                await page.click(DOM_APPLY_LOCATION_SELECTOR);
                await page.waitFor(5000);
                ////KONUMU PRESET'E KAYDET
                await page.click(PRESET_INDEX_SELECTOR);
                for (let i = 0; i < 10; i++)
                await page.keyboard.down('Backspace');
                await page.keyboard.type(index.toString());
                await page.waitFor(1000);
                await page.click(PRESET_NAME_SELECTOR);
                for (let i = 0; i < 10; i++)
                await page.keyboard.down('Backspace');
                await page.keyboard.type(index.toString());
                await page.waitFor(1000);
                await page.click(PRESET_SAVE_SELECTOR);
                await page.waitFor(2000);
                sevgi_api.console_log("Preset "+(index+1)+" ayarlandı..")

            }
        }
        module.exports.set_preset_1= async function(page){
            var horizontal = ["0"];
            var vertical = ["0"];
            sevgi_api.console_log("Presetler siliniyor..")
            
                await page.waitFor(1000);
                await page.click(PRESET_INDEX_SELECTOR);
                await page.waitFor(1500);
                for (let i = 0; i < 10; i++)
                await page.keyboard.down('Backspace');
                await page.keyboard.type('1');
                await page.keyboard.press('Enter');
                await page.waitFor(1500);
                await page.click(PRESET_DELETE_SELECTOR);
                       
            sevgi_api.console_log("Presetler silindi.");
            
                sevgi_api.console_log("Preset "+(1)+" ayarlanıyor..")
                ////YATAY KONUMU GİR
                await page.click(DOM_HORIZONTAL_SELECTOR);
                await page.waitFor(1000);
                for (let i = 0; i < 10; i++)
                    await page.keyboard.down('Backspace');
                await page.keyboard.type(horizontal[0]);
                ////DIKEY KONUMU GIR
                await page.click(DOM_VERTICAL_SELECTOR);
                await page.waitFor(1000);
                for (let i = 0; i < 10; i++)
                    await page.keyboard.down('Backspace');
                await page.keyboard.type(vertical[0]);
                await page.waitFor(1000);
                ////KONUMA GIT
                await page.click(DOM_APPLY_LOCATION_SELECTOR);
                await page.waitFor(5000);
                ////KONUMU PRESET'E KAYDET
                await page.click(PRESET_INDEX_SELECTOR);
                for (let i = 0; i < 10; i++)
                await page.keyboard.down('Backspace');
                await page.keyboard.type('1');
                await page.waitFor(1000);
                await page.click(PRESET_NAME_SELECTOR);
                for (let i = 0; i < 10; i++)
                await page.keyboard.down('Backspace');
                await page.keyboard.type('1');
                await page.waitFor(1000);
                await page.click(PRESET_SAVE_SELECTOR);
                await page.waitFor(2000);
                sevgi_api.console_log("Preset "+(1)+" ayarlandı..")
                

            }
        module.exports.set_preset_3_7= async function(page){
            var horizontal = ["0","24000"];
            var vertical = ["9000","0"];
            sevgi_api.console_log("Presetler siliniyor..")
            
                await page.waitFor(1000);
                await page.click(PRESET_INDEX_SELECTOR);
                await page.waitFor(1500);
                for (let i = 0; i < 10; i++)
                await page.keyboard.down('Backspace');
                await page.keyboard.type('3');
                await page.keyboard.press('Enter');
                await page.waitFor(1500);
                await page.click(PRESET_DELETE_SELECTOR);
                await page.waitFor(1000);
                await page.click(PRESET_INDEX_SELECTOR);
                await page.waitFor(1500);
                for (let i = 0; i < 10; i++)
                await page.keyboard.down('Backspace');
                await page.keyboard.type('7');
                await page.keyboard.press('Enter');
                await page.waitFor(1500);
                await page.click(PRESET_DELETE_SELECTOR);
                
            
            sevgi_api.console_log("Presetler silindi.");
            
                sevgi_api.console_log("Preset "+(3)+" ayarlanıyor..")
                ////YATAY KONUMU GİR
                await page.click(DOM_HORIZONTAL_SELECTOR);
                await page.waitFor(1000);
                for (let i = 0; i < 10; i++)
                    await page.keyboard.down('Backspace');
                await page.keyboard.type(horizontal[0]);
                ////DIKEY KONUMU GIR
                await page.click(DOM_VERTICAL_SELECTOR);
                await page.waitFor(1000);
                for (let i = 0; i < 10; i++)
                    await page.keyboard.down('Backspace');
                await page.keyboard.type(vertical[0]);
                await page.waitFor(1000);
                ////KONUMA GIT
                await page.click(DOM_APPLY_LOCATION_SELECTOR);
                await page.waitFor(5000);
                ////KONUMU PRESET'E KAYDET
                await page.click(PRESET_INDEX_SELECTOR);
                for (let i = 0; i < 10; i++)
                await page.keyboard.down('Backspace');
                await page.keyboard.type('3');
                await page.waitFor(1000);
                await page.click(PRESET_NAME_SELECTOR);
                for (let i = 0; i < 10; i++)
                await page.keyboard.down('Backspace');
                await page.keyboard.type('3');
                await page.waitFor(1000);
                await page.click(PRESET_SAVE_SELECTOR);
                await page.waitFor(2000);
                sevgi_api.console_log("Preset "+(3)+" ayarlandı..")
                sevgi_api.console_log("Preset "+(7)+" ayarlanıyor..")
                ////YATAY KONUMU GİR
                await page.click(DOM_HORIZONTAL_SELECTOR);
                await page.waitFor(1000);
                for (let i = 0; i < 10; i++)
                    await page.keyboard.down('Backspace');
                await page.keyboard.type(horizontal[1]);
                ////DIKEY KONUMU GIR
                await page.click(DOM_VERTICAL_SELECTOR);
                await page.waitFor(1000);
                for (let i = 0; i < 10; i++)
                    await page.keyboard.down('Backspace');
                await page.keyboard.type(vertical[1]);
                await page.waitFor(1000);
                ////KONUMA GIT
                await page.click(DOM_APPLY_LOCATION_SELECTOR);
                await page.waitFor(5000);
                ////KONUMU PRESET'E KAYDET
                await page.click(PRESET_INDEX_SELECTOR);
                for (let i = 0; i < 10; i++)
                await page.keyboard.down('Backspace');
                await page.keyboard.type('7');
                await page.waitFor(1000);
                await page.click(PRESET_NAME_SELECTOR);
                for (let i = 0; i < 10; i++)
                await page.keyboard.down('Backspace');
                await page.keyboard.type('7');
                await page.waitFor(1000);
                await page.click(PRESET_SAVE_SELECTOR);
                await page.waitFor(2000);
                sevgi_api.console_log("Preset "+(7)+" ayarlandı..")

            }
        
        
         module.exports.set_patrol= async function(page){
            sevgi_api.console_log("Patrol ayarlanıyor..")
            await page.click(PATROL_NAME_SELECTOR);
            await page.keyboard.type("0");
            await page.keyboard.press('Enter');
            await page.waitFor(1000);
            await page.click(PATROL_PRESET_LIST);
            for (let i = 0; i < 10; i++)
                await page.keyboard.down('Backspace');
            await page.keyboard.type("0,1,2");
            await page.click(PATROL_TIME_RANGE_SELECTOR);
            for (let i = 0; i < 10; i++)
                await page.keyboard.down('Backspace');
            await page.keyboard.type("5,5,5");
            await page.click(PATROL_SAVE_SELECTOR);
            sevgi_api.console_log("Patrol ayarlandı. Presetler arası bekleme süresi 5sn..");

        }
        module.exports.time_pass = async function(page){
    var zaman=0;
    var wait =1;
    var interval = setInterval(function(){zaman++;},10);
    const rl = readline.createInterface({input: process.stdin,output: process.stdout});
    rl.on("line",function(){sevgi_api.console_log("Sayaç durduruldu"+zaman/100+"sn");});
    process.stdin.on("keypress",function(){
        clearInterval(interval);
        wait= !wait;
      });
    while(wait) await page.waitFor(10);
        return zaman/100;    
        }
        module.exports.push_time = async function(page,set)
        {   var date;
            var hour;
            var data = new Array();
            var wait =1;
            const rl = readline.createInterface({input: process.stdin,output: process.stdout});
            await process.stdin.on("keypress",function(){
             date = new Date();
             data[0] = date.getHours();
             data[1] = date.getMinutes();
             data[2] = date.getSeconds();
             data[3] = date.getMilliseconds();
             wait= !wait;

      });
        while(wait) await page.waitFor(10);
            await rl.close();
        var return_value = data; 
             if (set=1) return_value = data[0]+":"+data[1]+":"+data[2];
            return return_value;
    
        }
        
        module.exports.goto_home= async function(page,set,value)
        {
            sevgi_api.console_log("Göreve dön ayarlanıyor..")
            const input1 = await page.$(PRESET_GOTO_HOME_CHECKBOX_SELECTOR_UP);
            const inpot1 = await input1.$eval('#self_goto_home' , node => node.checked);
            if (inpot1 != set)
            await page.click(PRESET_GOTO_HOME_CHECKBOX_SELECTOR);
            await page.click(PRESET_GOTO_HOME_SELECTOR);
            for (let i = 0; i < 10; i++)
                await page.keyboard.down('Backspace');
            await page.keyboard.type(value.toString());
            await page.click(PRESET_GOTO_HOME_SAVE_BUTTON);
            await page.waitFor(2000);
            sevgi_api.console_log("Göreve dön ayarlandı "+value+"sn..");
        }
        module.exports.break_patrol= async function(page)
        {
            sevgi_api.console_log("Patrol durduruldu..")
            await page.click(PATROL_STOP_SELECTOR);
        }
         module.exports.run_patrol= async function(page)
        {
            sevgi_api.console_log("Patrol başlatıldı..")
            await page.click(PATROL_RUN_SELECTOR);
        }
        module.exports.turn_left_right= async function(page,direction)
        {
            if(direction=="r")
            await page.click(PTZ_RIGHT_SELECTOR,{delay:2000});
                
        }
        module.exports.go_position = async function(page,vertical,horizontal,zoom)
        {
            ////YATAY KONUMU GİR
                await page.click(DOM_HORIZONTAL_SELECTOR);
                await page.waitFor(1000);
                for (let i = 0; i < 10; i++)
                    await page.keyboard.down('Backspace');
                await page.keyboard.type(horizontal);
                ////DIKEY KONUMU GIR
                await page.click(DOM_VERTICAL_SELECTOR);
                await page.waitFor(1000);
                for (let i = 0; i < 10; i++)
                    await page.keyboard.down('Backspace');
                await page.keyboard.type(vertical);
                await page.waitFor(1000);
                ////ZOOM GİR
                await page.click(DOM_ZOOM_SELECTOR);
                await page.waitFor(1000);
                for (let i = 0; i < 10; i++)
                    await page.keyboard.down('Backspace');
                await page.keyboard.type(zoom);
                await page.waitFor(1000);
                ////KONUMA GIT
                await page.click(DOM_APPLY_LOCATION_SELECTOR);
                await page.waitFor(5000);
            
        }
        module.exports.get_time = async function(set)
        {    var data = new Array();
            date = new Date();
             data[0] = date.getHours();
             data[1] = date.getMinutes();
             data[2] = date.getSeconds();
             data[3] = date.getMilliseconds(); 
            var return_value = data; 
             if (set==1) return_value = data[0]+":"+data[1]+":"+data[2];
            return return_value;
    
            
        }
              
	
}());