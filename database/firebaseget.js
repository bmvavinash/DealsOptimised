async function firebaseget(jsonFileName = "dailydeals") {
  let len = 0;
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const config = require("../config/config");
    const constants = require("../config/constants");
    const dbname = constants.postingTypesConfig[constants.type].DB;
    let DB_Name = config.DATABASE_CONFIG[`${dbname}_NAME`];
    
    jsonFileName = config.DATABASE_CONFIG.JSON_FILE_NAME
    const apiUrl = `https://${DB_Name}-default-rtdb.firebaseio.com/${jsonFileName}.json`;

    var requestOptions = {
      method: "GET",
    };
//check new1
//     try {
//       const response = await fetch(apiUrl, requestOptions);
//       const data = await response.json();
//       const objectCount = Object.keys(data).length;
//       console.log(`Success in Firebase Get. Response contains ${objectCount} objects.`);
//       len = objectCount;
//       // Any operation dependent on `len` should be inside this try block or after it in an async context
//     } catch (error) {
//       console.log("error", error);
//     }
//     console.log("totalLength ", len);
//     return len;
//   } catch (e) {console.log(e);}
// }


//check new2

const response = await fetch(apiUrl);
if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

const data = await response.json();
const objectCount = Object.keys(data).length;
console.log(`Success in Firebase Get. Response contains ${objectCount} objects.`);
len = objectCount;


//check original
//   await fetch(apiUrl, requestOptions  ).then(response => response.json()).then(data => {
//     const objectCount = Object.keys(data).length;
//     console.log(`Success in Firebase Get. Response contains ${objectCount} objects.`);
//     len = objectCount
//   })
//   .catch((error) => console.log("error", error));

//     // len = result
//   console.log("Length Inside Firebase GET is ",Object.keys(data).length)

// output = JSON.parse(result).includes("false");

}
catch(e){
console.log(e);
}
// }
// catch(e){
//   console.log(e);
// }
console.log("totalLength ",len)
return len
}
exports.firebaseget = firebaseget;
