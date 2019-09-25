//fertig
const thinky = require("../thinky");

const type = thinky.type;


let PaymentMethod = thinky.createModel("PaymentMethod", {
  id: type.string(),
  name: type.string(),
  user_id: type.string(),
  restaurant_id: type.string()
});

module.exports = PaymentMethod;



