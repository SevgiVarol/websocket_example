var sevgi_api= require('./sevgi_api');
  (function() {

        const APPLICATION_SELECTOR_UP = 'body > div > div:nth-child(3) > div.col-md-8 > div.view-container > div > form > div:nth-child(1) > div > div';
	const FIRMWARE_SELECTOR_UP= 'body > div > div:nth-child(3) > div.col-md-8 > div.view-container > div > form > div:nth-child(10) > div > div';
	        
        module.exports.test_application = async function(page) 
        {
                        const input = await page.$(APPLICATION_SELECTOR_UP);
                        const inpot = await input.$eval('.form-control' , node => node.value);
                        sevgi_api.console_log("APPLICATION VERSION");
                        sevgi_api.console_log(inpot);
                        sevgi_api.console_log("");
                        return inpot;
            
	}
	module.exports.test_firmware = async function(page) 
        {
                        const input = await page.$(FIRMWARE_SELECTOR_UP);
                        const inpot = await input.$eval('.form-control' , node => node.value);
                        
                        sevgi_api.console_log("FIRMWARE VERSION");
                        sevgi_api.console_log(inpot);
                        sevgi_api.console_log("");
                        return inpot;
            
        }
	
    
}());


 

