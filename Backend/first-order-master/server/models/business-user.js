import thinky from "../thinky";

let type = thinky.type;

let BusinessUser = thinky.createModel("BusinessUser", {
  id: type.string(),
  fname: type.string(),
  lname: type.string(),
  email: type.string(),
  password: type.string(),
  
});

module.exports = BusinessUser;

const Restaurant = require("./restaurant");
//evtl noch ändern
BusinessUser.hasMany(Restaurant, "restaurants", "id", "businessUser_id");

