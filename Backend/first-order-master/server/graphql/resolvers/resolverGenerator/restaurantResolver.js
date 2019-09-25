import Restaurant from "../../../models/restaurant";
import BusinessUser from "../../../models/business-user";

export async function addRestaurant(args) {
  const {
    name,
    address,
    payment_method_id, //ist das noch aktuell? Im Model gibt es keine payment_method_id, da es sich um eine HasMany relation handelt
    tables,
    businessUser_ID
  } = args.userInput;

  const tempRestaurant = {
    name: name,
    address: address,
    payment_method_id: payment_method_id,
    tables: tables
  };

  let restaurant = new Restaurant(tempRestaurant);

  let businessUser = await BusinessUser.filter({
    id: businessUser_ID
  })
    .then(result => {
      return result[0];
    })
    .catch(err => console.log(err));

  businessUser.restaurants = restaurant;
  restaurant.businessUser = businessUser;

  let result = await restaurant
    .saveAll({ businessUser: true })
    .then(result => {
      return result;
    })
    .catch(err => console.log(err));

  return result;
}

export async function getRestaurantByID(args) {
  let result = await Restaurant.filter({
    id: args.restaurantID
  })
    .getJoin({ orders: true, businessUser: true, categories: { products: true } })
    .then(result => {
      return result;
    });

  return result[0];
}

export async function getAllRestaurants() {

  let result = await Restaurant.getJoin({
    businessUser: true,
    orders: {orderedProducts: true},
    categories: { products: true }
  }).then(result => {
    return result;
  });

  console.log(result)

  return result;
}

export async function getRestaurantsByBU(args) {
  console.log(args.businessUser_id);
  let result = await Restaurant.filter({
    businessUser_id: args.businessUser_id
  })
    .getJoin({ businessUser: true, categories: { products: true } })
    .then(result => {
      return result;
    });

  return result;
}
