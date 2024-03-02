const { Builder, By } = require("selenium-webdriver");
require("chromedriver");
const chrome = require("selenium-webdriver/chrome");
const { getProductDetails } = require("../scheduler");
const { firebaseget } = require("../database/firebaseget");
const { getAccessToken } = require("../database/getAccessToken");
const constants = require('../config/constants');
const fs = require('fs').promises;

async function readJsonFile(filePath) {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
}

async function getTelegramDealLink(driver) {

    let len=await firebaseget();
    let env = constants.env

    access_token = await getAccessToken(env);
    // let driver = await new Builder().forBrowser("chrome").setChromeOptions(new chrome.Options()).build();

    
    
  //chrome
  let options = await new chrome.Options();
  options.debuggerAddress("localhost:9222");
  //CHROME
  driver = await chrome.Driver.createSession(options);
  // driver = await chrome.Driver.createSession();

    const date = new Date();

    // Get the year, month, and day from the date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, add 1 to get the correct month
    const day = String(date.getDate()).padStart(2, '0');

    // Format the date as YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;
    console.log("Formatted Date is ",formattedDate)

    const jsonFilePath = `C:/Users/Dell/Downloads/Telegram Desktop/ChatExport_${formattedDate}/result.json`;

    try {
        const inputData = await readJsonFile(jsonFilePath);
        const messages = inputData.messages;
        let text = ""
        let link = ""

        for (let message of messages) {
            if (message && message.text_entities) {
                for (let entity of message.text_entities) {
                    if (entity.type === "link") {
                        link = entity.text; // Assign link to a string variable
                    } else {
                        text += entity.text + " "; // Append other text
                    }
                }
                await getProductDetails(link,text,len,access_token,driver)
            }

            // Log the link and the full text (excluding the link)
            // console.log("Link:", link);
            // console.log("Text:", text.trim()); // Trim to remove any leading/trailing whitespace

            // Example for further processing
            // if (link) {
            //     await driver.get(link);
            //     // Further processing logic here
            // }
        }
    } catch (error) {
        console.error("Error processing links:", error);
    } 
}

// Example function to extract details from a page
// async function extractDetailsFromPage(driver) {
//     // Implement details extraction logic here
//     // Example: const title = await driver.findElement(By.tagName("h1")).getText();
// }

// Replace 'your_json_file_path.json' with the actual path to your JSON file


module.exports = {
    getTelegramDealLink
}
