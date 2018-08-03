  var sevgi_api= require('./sevgi_api');
  (function() {

        const NTP_SERVER1_SELECTOR_UP = 'body > div > div:nth-child(3) > div.col-md-8 > div.view-container > div > form > div:nth-child(3) > div > div';
	
               
	module.exports.test_ntp_server1 = async function(page , set) 
        {
                        const input = await page.$(NTP_SERVER1_SELECTOR_UP);
                        const inpot = await input.$eval('.form-control' , node => node.value);
                        sevgi_api.console_log("NTP Server1 IP");
                        sevgi_api.console_log(inpot);
                        sevgi_api.console_log("");
                        if(inpot == set)
                        {
                            sevgi_api.console_log("NTP Server1 IP is TRUE");
                        }
                        else
                        {
                            sevgi_api.console_log("NTP Server1 IP is FALSE");
                        }
                        
                        return inpot;
            
	}
	
	
    
}());


 

 
