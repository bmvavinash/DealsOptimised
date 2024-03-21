async function firebasepost(app, access_token, env="prod", jsonFileName="deals", url="https://dealshubglobal-default-rtdb.firebaseio.com",extract="Telegram",extractData="productlinks") {
  const fetch = require('node-fetch');

  let authorized=false
  // let env=false

  
  const constants = require('../config/constants.js');
  const config = require('../config/config.js');

  env=constants.env

  const dbname= constants.postingTypesConfig[constants.type].DB
  let DB_Name=config.DATABASE_CONFIG[`${dbname}_NAME`];
  const filePath = config.DATABASE_CONFIG[`${dbname}_TOKEN_FILE`];

  jsonFileName = config.DATABASE_CONFIG.JSON_FILE_NAME

//   if(env=="prod"){

//   if(extract=="Excel"&& extractData == "productlinks"){
//     filename = "dealshubloots-firebase-adminsdk-o8i6x-ce14a7cfb9"
//     console.log("getAccessToken Prod Excel(dealshubglobal)")
//   }
//   else if(extract=="Excel" && extractData == "categorylinks"){
//     filename = "dealshublinks-firebase-adminsdk-2q397-1d74ec028d"
//     console.log("getAccessToken Prod Excel Categories(dealshubglobal)")
//     url = "https://dealshublinks-default-rtdb.firebaseio.com"
//   }
//   else{
//     filename = "dealshubglobal-firebase-adminsdk-7527s-a09ba4201e"
//     console.log("getAccessToken Prod Telegram(dealshubglobal)")
//   }
// }
//   else if(env=="stage") {
//     url = "https://avideals1-default-rtdb.firebaseio.com"
//   }

const apiUrl = `https://${DB_Name}-default-rtdb.firebaseio.com/${jsonFileName}.json?access_token=${access_token}`

  // const apiUrl = `${url}/${jsonFileName}.json?access_token=${access_token}`;
  await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(app),
  })
    .then(async (response) => {
      const responseData = await response.json();
      console.log('Response:', responseData);
      if (response.status === 401 || responseData.name.toLowerCase().includes('unauthorized')) {
        authorized = false
      } else {
        authorized = true
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      authorized = false

    });
    return authorized
}

exports.firebasepost = firebasepost;
