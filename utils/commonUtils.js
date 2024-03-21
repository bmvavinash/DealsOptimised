function validatePrice(value) {
    let cleanedValue = value.replace(/₹|,|\s|&nbsp;|-/g, "").trim();
    const price = parseInt(cleanedValue, 10);
    return {
        isValid: !isNaN(price) && price > 0,
        value: price
    };
}

function validateDiscount(value) {
    let cleanedValue = value.replace(/%|\s|&nbsp;|-/g, "").trim();
    const discount = parseInt(cleanedValue, 10);
    return {
        isValid: discount > 0,
        value: discount
    };
}
function validateText(value) {
    // Replace "&amp;" with "&" and remove all white spaces
    let cleanedValue = value.replace(/&amp;|\s/g, "").replace(/-/g, "").trim();
    return cleanedValue;
}


function formatProductInfo(product) {
    let messagePrefix = "";

    // product?.productText + `\n\nhttps://dealshubglobal.com/p/${product?.id}`
  
    // Determine the message prefix based on the discount range
    if (product.discount > 85) {
      messagePrefix = "🔥🔥 LOOT! \n";
    } else if (product.discount > 75) {
      messagePrefix = "Offer! \n";
    } if (product.discount > 50) {
      messagePrefix += `${product?.discount}% off on `;
    }
    
    // Construct the message
    let message = `${messagePrefix}${product.productText} \n\n➡️ Deal price: ₹${product.price}`;
    
    // Append additional text if the discount is 50% or less
    if (product.discount <= 50) {
      message += `\ndiscount is ${product.discount}`;
    }
    
    // Append link and hashtags
    message += `\n\nBuy Here : https://dealshubglobal.com/p/${product?.id}\n\n` ;
    
    if (product.discount > 85) {
      message +="⚡️⚡️**Price Dropped** \n"
    }
    message+=`#${product.storeType}`
    if (product?.category?.mainCategory!=""){
      `#${product?.category?.mainCategory}`
    } 
    // 💥 Bank Offer : ₹1,000 Instant Discount With ICICI, ONECARD Credit Card Txn
    // 💥💥
    // 🛒

//     ✔️Offer Price:₹363
// 🛍

/*
Mamaearth MEGA SALE 🔥🔥

➡️ Offer: Buy for Rs.699 & Get 2 product FREE worth Rs.1298

✅ Use code: MEGAOFFER

👉 Link: https://extp.in/yMQpJm

🚨Freebies on order above Rs.699 👉 Get Perfume Aqua - 50ml + Hydra-Matte Crayon Lipstick - 2.4g  [Worth Rs.129😎

🔴 Note: Get Additional 5% Prepaid Discount
*/


// ❌Regular Price:₹721
  
    return message;
  }
  

function validateDiscount(value) {
    let cleanedValue = value.replace(/%|\s|&nbsp;|-/g, "").trim();
    const discount = parseInt(cleanedValue, 10);
    return {
        isValid: discount > 0,
        value: discount
    };
}

module.exports = {
    validatePrice,
    formatProductInfo,
    validateDiscount,
    validateText
};
