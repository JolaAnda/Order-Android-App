//fertig
import thinky from "../thinky";

let type = thinky.type;

let Restaurant = thinky.createModel("Restaurant", {
  id: type.string(),
  name: type.string(),
  address: type.string(),
  businessUser_id: type.string(),
  tables: [type.string()]
});
module.exports = Restaurant;

const BusinessUser = require("./business-user");
const Category = require("./category");
const Order = require("./order");
const PaymentMethod = require("./paymentMethod");

Restaurant.hasMany(Category, "categories", "id", "restaurant_id");
Restaurant.belongsTo(BusinessUser, "businessUser", "businessUser_id", "id");
Restaurant.hasMany(Order, "orders", "id", "restaurant_id");
Restaurant.hasMany(PaymentMethod, "paymentMethods", "id", "restaurant_id");
