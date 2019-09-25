//fertig
import thinky from "../thinky";

let type = thinky.type;

let Category = thinky.createModel("Category", {
  id: type.string(),
  name: type.string(),
  restaurant_id: type.string()
});

module.exports = Category;

const Product = require("./product");
const Restaurant = require("./restaurant");

Category.belongsTo(Restaurant, "restaurant", "restaurant_id", "id");
Category.hasMany(Product, "products", "id", "category_id");
