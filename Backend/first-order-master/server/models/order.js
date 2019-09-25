//fertig
const config = require("../config");
const thinky = require("thinky")(config);

let type = thinky.type;

let Order = thinky.createModel("Order", {
  id: type.string(),
  tableNumber: type.number(),
  order_status: type.string(),
  time: type.string(),
  paid: type.boolean(),
  restaurant_id: type.string(),
  user_id: type.string(),
  total: type.number()
});
module.exports = Order;

const User = require("./user");
const Restaurant = require("./restaurant");
const OrderedProduct = require("./orderedProduct");

Order.belongsTo(User, "user", "user_id", "id");
Order.belongsTo(Restaurant, "restaurant", "restaurant_id", "id");
Order.hasMany(OrderedProduct, "orderedProducts", "id", "order_id");
