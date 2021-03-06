  (function() {
        var sevgi_api= require('./sevgi_api');
        const IR_FILTER_MODE = '#ircf_stat';
	const IR_FILTER_TRANSITION = '#auto_ircf_stat';
	const IR_FILTER_THRESHOLD = '#ircf_threshold';
        const IR_APPLY = '#irRow > td:nth-child(2) > p > button';
        const IR_SELECTOR_UP = '#irRow > td:nth-child(1)';
        const IR_TAB_SELECTOR = '#t01 > tbody > tr:nth-child(7)';
        const FOCUS_PLUS_SELECTOR = '#focus_plus';
        const FOCUS_MINUS_SELECTOR  = '#focus_minus';
        const ONE_SHOT_FOCUS_SELECTOR = '#one_push_af';
        module.exports.focus_plus = async function(page)
        {
            await page.click(FOCUS_PLUS_SELECTOR,{delay:10000});
        }
        module.exports.focus_minus = async function(page)
        {
            await page.click(FOCUS_MINUS_SELECTOR,{delay:15000});
        }
        module.exports.focus_one_shot = async function(page)
        {
            await page.click(ONE_SHOT_FOCUS_SELECTOR);
        }
	module.exports.set_ir_filter_mode = async function(page, set) 
        {
            await page.waitFor(2000);
            await page.click(IR_TAB_SELECTOR); 
            await page.waitFor(1000);
            await page.waitForSelector(IR_FILTER_MODE,'visible');
            await page.click(IR_FILTER_MODE);
            await page.keyboard.type(set);
            await page.keyboard.press('Enter');
            
	}
	module.exports.set_ir_filter_transition = async function(page, set)
        {
            await page.waitForSelector(IR_FILTER_TRANSITION,'visible');
            await page.click(IR_FILTER_TRANSITION);
            await page.keyboard.type(set);
            await page.keyboard.press('Enter');
            
        }
        
        module.exports.set_ir_filter_threshold = async function(page, set)
        {
            await page.waitForSelector(IR_FILTER_THRESHOLD,'visible');
            await page.click(IR_FILTER_THRESHOLD);
            await page.keyboard.type(set);
            await page.keyboard.press('Enter');
          
        }
        
        module.exports.ir_filter_apply = async function(page) 
        {
            await page.waitForSelector(IR_APPLY,'visible');
            await page.click(IR_APPLY);
            await page.waitFor(1000);
           
	}
	
	module.exports.test_ir_filter_mode = async function(page, set) 
        {
            await page.waitFor(2000);
            await page.click(IR_TAB_SELECTOR); 
            await page.waitFor(1000);
            await page.waitForSelector(IR_SELECTOR_UP,'visible');
            await page.waitForSelector('#ircf_stat','visible');
            await page.waitFor(1000);
            const input = await page.$(IR_SELECTOR_UP);
            const inpot = await input.$eval('#ircf_stat' , node => node.selectedIndex);
            if(inpot == set)
              {
                sevgi_api.console_log("IR Cut Filter Modu.....DOĞRU");
                return 1;
              }
            else
              {
                 sevgi_api.console_log("IR Cut Filter Modu.....YANLIŞ");
                 return 0;
              }
             
            
	}
	module.exports.test_ir_filter_transition = async function(page, set)
        {
            await page.waitForSelector(IR_SELECTOR_UP,'visible');
             const input = await page.$(IR_SELECTOR_UP);
            const inpot = await input.$eval('#auto_ircf_stat' , node => node.selectedIndex);
            if(inpot == set)
              {
                sevgi_api.console_log("IR-Cut Filtre Geçişi.....DOĞRU");
                return 1;
              }
            else
              {
                sevgi_api.console_log("IR-Cut Filtre Geçişi.....YANLIŞ");
                return 0;
              }
        
            
        }
	
	
}());


 
