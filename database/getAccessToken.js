var { google } = require("googleapis");

function getAccessToken(env="prod",extract="Telegram",extractData="Telegram") {

  const constants = require('../config/constants.js');
  const config = require('../config/config.js');

  const dbname= constants.postingTypesConfig[constants.type].DB
  let DB_Name=config.DATABASE_CONFIG[`${dbname}_NAME`];
  const filePath = config.DATABASE_CONFIG[`${dbname}_TOKEN_FILE`];
  
  // if(env=="prod"){
    
  //   if(extract=="Excel" && extractData == "productlinks"){
  //     filename = "dealshubloots-firebase-adminsdk-o8i6x-ce14a7cfb9"
  //     console.log("getAccessToken Prod Excel(dealshubglobal)")
  //   }
  //   // else if(extract=="Excel" && extractData == "categorylinks"){
  //   else if(extractData == "categorylinks"){
  //     filename = "dealshublinks-firebase-adminsdk-2q397-1d74ec028d"
  //     console.log("getAccessToken Prod Excel(dealshubglobal)")
  //   }
  //   else{
  //     filename = "dealshubglobal-firebase-adminsdk-7527s-a09ba4201e"
  //     console.log("getAccessToken Prod Telegram(dealshubglobal)")
  //   }
  // } else if(env=="stage") {
  //   filename = "avideals1-firebase-adminsdk-6uwg0-f38dc84259"
  //   console.log("getAccessToken stage Telegram(avideals1)")
  // }
  return new Promise((resolve, reject) => {
    var serviceAccount = require(`${constants.pathToFile}/${filePath}.json`);

    var scopes = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/firebase.database"
    ];

    // Authenticate a JWT client with the service account.
    var jwtClient = new google.auth.JWT(
      serviceAccount.client_email,
      null,
      serviceAccount.private_key,
      scopes
    );

    jwtClient.authorize(function (error, tokens) {
      if (error) {
        console.log("Error making request to generate access token:", error);
        reject(error);
      } else if (tokens.access_token === null) {
        console.log("Provided service account does not have permission to generate access tokens");
        reject(new Error("Service account does not have permission"));
      } else {
        const accessToken = tokens.access_token;
        console.log("accessToken is", accessToken);
        resolve(accessToken);
      }
    });
  });
}

exports.getAccessToken = getAccessToken;
