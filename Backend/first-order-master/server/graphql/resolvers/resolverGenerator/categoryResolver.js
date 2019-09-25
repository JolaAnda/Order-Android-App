import Category from "../../../models/category";
import Restaurant from "../../../models/restaurant";

export async function addCategory(args) {
  const { name, restaurant_ID } = args.userInput;

  const tempCategory = {
    name: name
  };

  let category = new Category(tempCategory);

  console.log(category);

  let restaurant = await Restaurant.filter({ id: restaurant_ID }).then(
    result => {
      return result[0];
    }
  );

  restaurant.categories = category;
  category.restaurant = restaurant;

  let tempResult = await category
    .saveAll({ restaurant: true })
    .then(tempResult => {
      return tempResult;
    });

  let result = await Category.filter({ id: tempResult.id })
    .getJoin({
      restaurant: true,
      products: true
      //{ prices: true }
    })
    .then(result => {
      console.log(result);
      return result;
    });

  return result[0];
}

export async function getCategoriesByRestaurantID(args) {
  const { restaurantID } = args;

  let categories = await Category.filter({ restaurant_id: restaurantID })
    .getJoin({
      restaurant: true,
      products: true
      //{ prices: true }
    })
    .then(result => {
      console.log(result);
      return result;
    });
  return categories;
}
