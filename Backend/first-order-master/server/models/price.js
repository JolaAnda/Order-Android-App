//fertig
const thinky = require("../thinky");
let type = thinky.type;

let Price = thinky.createModel("Price", {
  id: type.string(),
  price: type.string(),
  fromYear: type.string(),
  toYear: type.string(),
  fromMonth: type.string(),
  toMonth: type.string(),
  fromWeek: type.string(),
  toWeek: type.string(),
  fromDay: type.string(), 
  toDay: type.string(),
  fromH_min: type.string(),
  toH_min: type.string(),
  product_id: type.string()  //OrderedProduct_id: type.string()
});
module.exports = Price;



