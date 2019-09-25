//preis entfernt
const thinky = require("../thinky");
let type = thinky.type;

let OrderedProduct = thinky.createModel("OrderedProduct", {
    id: type.string(),
    order_id: type.string(),
    //price_id: type.string(), 
    //amount: type.number(),
    specialWish: type.string(),
    product_id: type.string()
});

module.exports = OrderedProduct;

const Product = require("./product");
//const Price = require("./price");
const Order = require("./order");


OrderedProduct.belongsTo(Product, "products", "product_id", "id");
//OrderedProduct.belongsTo(Price, "price", "price_id", "id");
OrderedProduct.belongsTo(Order, "order", "order_id", "id");

