const { Builder, By, Key, until } = require("selenium-webdriver");
const { scrapeAmazonProduct } = require("./scrappers/amazon")
const { scrapeFlipkartProduct } = require("./scrappers/flipkart");
const { getAccessToken } = require("./database/getAccessToken");
const { telegram } = require("./socialMedia/telegramPoster");
const { whatsapp } = require("./socialMedia/whatsappPoster");
const { formatProductInfo } = require("./utils/commonUtils.js");


async function postDeals(driver,product) {

    // console.log("Product is ",product," Type is ",type)
    
    require("chromedriver");
    
    var chrome = require("selenium-webdriver/chrome");
    
    let options = await new chrome.Options();
    let text="";
    
    options.debuggerAddress("localhost:9222");
    
    //CHROME
    driver = await chrome.Driver.createSession(options);
    let telegramId=""
    let whatsappId=""
    console.log("constants initialise in postdeals");
    const constants = require('./config/constants');
    const config = require('./config/config.js');
    console.log("config initialise in postdeals");

    const { postingTypesConfig } = require('./config/constants');
    type = constants.type

    const constantsData = postingTypesConfig[type];

    const dbname= constantsData.DB
    const filePath = config.DATABASE_CONFIG[`${dbname}_TOKEN_FILE`];
    if(product.discount>75){
        telegramId = config.TELEGRAM_CHANNELS.DEALS_ABOVE_75;
        whatsappId = config.WHATSAPP_GROUPS.DEALS_ABOVE_75;
    }
    else{
        telegramId = config.TELEGRAM_CHANNELS.ALL_DEALS;
        whatsappId = config.WHATSAPP_GROUPS.ALL_DEALS;
    }
    
    console.log("Telegram chatid 75 is ",telegramId)

    // text=text+product?.productText + `\n\nhttps://dealshubglobal.com/p/${product?.id}` + " \n#"+product?.storeType + " #"+product?.category

    text = formatProductInfo(product);
    console.log("Text in Telegram is ",text)

    if (constantsData.postTo.telegram) {
        telegram(product.photo,telegramId,text)
    }
    if (constantsData.postTo.whatsapp) {
        whatsapp(product.photo,whatsappId,text)
    }
    if (constantsData.postTo.facebook && product.discount>=75) {
        facebook(product.photo,facebookId,text)
    }
}

module.exports = {
    postDeals
};