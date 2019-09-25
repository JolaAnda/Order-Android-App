import Order from "../../../models/order.js";
import User from "../../../models/user";
import Restaurant from "../../../models/restaurant";
import Product from "../../../models/product";

export async function deleteOrder(args) {
  const { orderID } = args;

  console.log(orderID);

  let finalResult = await Order.filter({ id: orderID }).then(res => {
    return res;
  });

  let result = await Order.filter({ id: orderID })
    .delete()
    .then(order => {
      console.log(order);
      return order;
    });

  return finalResult[0];
}

export async function addOrder(args) {
  const { tableNumber, restaurant_id, products } = args.userInput;

  async function generateProductArray() {
    return new Promise((resolve, reject) => {
      innerFunction();
      async function innerFunction() {
        let productArray = [];
        let priceTotal = 0;

        for (let i = 0; i < products.length; i++) {
          const product_id = products[i];

          var result = await Product.filter({ id: product_id }).then(result => {
            priceTotal = priceTotal + result[0].price;
            productArray.push(result[0]);
            return result[0];
          });
        }

        resolve({ productArray, priceTotal });
      }
    });
  }

  async function generateOrder(inputOrder) {
    return new Promise((resolve, reject) => {
      innerFunction();
      async function innerFunction() {
        let order = new Order(inputOrder);
        let restaurant = await Restaurant.filter({
          id: restaurant_id
        })
          .then(result => {
            return result[0];
          })
          .catch(err => console.log(err));

        order.restaurant = restaurant;
        restaurant.order = order;

        var finalResult = await order
          .saveAll({ user: true })
          .then(result => {
            return result;
          })
          .catch(err => console.log(err));

        console.log(finalResult);
        resolve(finalResult);
      }
    });
  }

  let finalResult = await generateProductArray().then(res => {
    var tmpOrder = {
      tableNumber: tableNumber,
      restaurant_id: restaurant_id,
      time: new Date().toLocaleString("de"),
      products: res.productArray,
      total: res.priceTotal
    };

    return generateOrder(tmpOrder).then(res => {
      return res;
    });
  });

  return finalResult;
}

export async function getOrdersByUser(args) {
  console.log(args.user_id);
  let result = await Order.filter({
    user_id: args.user_id
  })
    .getJoin({ user: true, orderedProducts: true })
    .then(result => {
      return result;
    });
  return result;
}
