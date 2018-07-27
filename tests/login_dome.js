 const {ping} = require('./ping.js');

 (function() {
	const LOGIN_USERNAME_SELECTOR = 'body > div > div:nth-child(3) > div.col-md-8 > div.view-container > div > form > div:nth-child(1) > div > div > input';
	const LOGIN_PASSWORD_SELECTOR = 'body > div > div:nth-child(3) > div.col-md-8 > div.view-container > div > form > div:nth-child(2) > div > div > div > input';
	const LOGIN_BUTTON_SELECTOR = 'body > div > div:nth-child(3) > div.col-md-8 > div.view-container > div > form > div:nth-child(3) > div > div > button';
	
	module.exports.loginCamera = async function(page, ip) {
            x=0;
            for(let i=0; !x; i++)
                {
                    x = await ping (page,ip);
                    await page.waitFor(1000);
                    if(!x)
                console.log("Kamera offline Lutfen Bekleyin  Gecen Süre = "+i+"sn");
                }
                camurl = 'http://'+ ip + ':8080';
		await page.goto(camurl, {"waitUntil": "networkidle2"});
		console.log("logging into " + camurl);
		
		await page.click(LOGIN_USERNAME_SELECTOR);
		await page.keyboard.type("admin");
		await page.click(LOGIN_PASSWORD_SELECTOR);
		await page.keyboard.type("admin");
		await page.click(LOGIN_BUTTON_SELECTOR);
		await page.waitForNavigation();
		
		console.log("We're in!");
		return {};
	}	
	
}());
