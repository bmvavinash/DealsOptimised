const { validatePrice, validateDiscount } = require("../utils/commonUtils");


module.exports = {
  price: [
    { type: 'id', selector: 'priceValue', validator: validatePrice, attribute: 'value'  },
    { type: 'xpath', selector: '//*[@id="corePriceDisplay_desktop_feature_div"]/div[1]/span[1]/span[2]/span[2]', validator: validatePrice },
    { type: 'xpath', selector: '//*[@id="corePrice_desktop"]/div/table/tbody/tr[1]/td[2]/span[1]/span[2]', validator: validatePrice },
    { type: 'xpath', selector: '//*[@id="corePrice_desktop"]/div/table/tbody/tr[2]/td[2]/span[1]/span[2]', validator: validatePrice },
    { type: 'xpath', selector: '//*[@id="corePrice_desktop"]/div/table/tbody/tr[2]/td[2]/span[1]/span[1]', validator: validatePrice },
    { type: 'xpath', selector: "/html/body/div[2]/div[3]/div[5]/div[4]/div[4]/div[10]/div/div[1]/div[2]/div/table/tbody/tr[2]/td[2]/span[1]/span[1]", validator: validatePrice },
    { type: 'xpath', selector: '//*[@id="corePriceDisplay_desktop_feature_div"]/div[1]/span[2]/span[2]/span[2]', validator: validatePrice },
    { type: 'className', selector: "a-price-whole", validator: validatePrice },
    { type: 'id', selector: 'price', validator: validatePrice },
      // Add more xpaths as needed
  ],
  discount: [
      { type: 'xpath', selector: '//*[@id="corePriceDisplay_desktop_feature_div"]/div[1]/span[1]', validator: validateDiscount },
      { type: 'xpath', selector: '//*[@id="corePriceDisplay_desktop_feature_div"]/div[1]/span[2]', validator: validateDiscount },
      { type: 'xpath', selector: '/html/body/div[2]/div[3]/div[5]/div[1]/div[1]/div[2]/div[2]/div/div/div[1]/div[3]/div[3]/div[1]/span[1]', validator: validateDiscount },
      { type: 'xpath', selector: '//*[@id="main"]/footer/div[1]/div/span[2]/div/div[2]/div[1]/div/div[1]', validator: validateDiscount },
      // Add more xpaths as needed
  ],
  photo: [
      { type: 'id', selector: 'productImageUrl', attribute: 'value' },
      { type: 'id', selector: 'landingImage', attribute: 'src' },
      // Add more xpaths as needed
  ],
  asin: [
      { type: 'xpath', selector: '//*[@id="productDetails_detailBullets_sections1"]/tbody/tr[1]/td' },
      // Add more xpaths as needed
  ],
  productText: [
      { type: 'id', selector: 'productTitle' },
      { type: 'xpath', selector: '//*[@id="productDescription"]/p' },
      // Add more xpaths as needed
    ],
    category: [
      { type: 'id', selector: 'productCategory', attribute: 'value' },
      { type: 'xpath', selector: '//*[@id="wayfinding-breadcrumbs_feature_div"]/ul/li/span/a' },
      // Add more xpaths as needed
  ],
  // Placeholder for future attributes
  // brand: [
  //     // Add xpaths for brand as needed
  // ],
  // Add more attributes here
};
