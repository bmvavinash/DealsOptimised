// @Whatsapp
async function whatsapp(watscode, text) {
  try {
    console.log("Whatsapp Seperate");
    await driver.get(`https://web.whatsapp.com/accept?code=${watscode}`);
    try {
      await driver
        .wait(
          until.elementLocated(
            By.xpath(
              '//*[@id="main"]/footer/div[1]/div/span[2]/div/div[2]/div[1]/div/div[1]'
            )
          ),
          30000
        )
        .click();
      let s = text.split("\n");
      for (let q = 0; q < s.length; q++) {
        await driver
          .actions()
          .sendKeys(s[q])
          .keyDown(Key.SHIFT)
          .keyDown(Key.RETURN)
          .keyUp(Key.RETURN)
          .keyUp(Key.SHIFT)
          .perform();
      }
      await driver.sleep(4000);
      await driver.actions().sendKeys(Key.RETURN).perform();
      await driver.sleep(4000);
      await driver
        .wait(
          until.elementLocated(
            By.xpath(
              '//*[@id="main"]/footer/div[1]/div/span[2]/div/div[2]/div[2]'
            )
          ),
          30000
        )
        .click();
      await driver.sleep(5000);
      await driver.actions().keyDown(Key.TAB).keyUp(Key.TAB);
      sendKeys(Key.RETURN).perform();
    } catch (error) {
      console.log("Whatsapp Error");
    }
  } catch (e) {console.log(e);}
}
// exports.whatsapp = whatsapp;
module.exports = {
  whatsapp
}
