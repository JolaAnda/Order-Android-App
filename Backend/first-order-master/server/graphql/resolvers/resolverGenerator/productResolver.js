import Product from "../../../models/product";
import Restaurant from "../../../models/restaurant";
import Category from "../../../models/category";

export async function addProduct(args) {
  const { name, description, category_ID, type, image_path } = args.userInput;

  const tempProduct = {
    name: name,
    description: description,
    type: type,
    image_path: image_path
  };

  let product = new Product(tempProduct);

  let category = await Category.filter({ id: category_ID }).then(result => {
    return result[0];
  });

  category.products = product;
  product.category = category;

  let tempResult = await product.saveAll({ category: true }).then(result => {
    return result;
  });

  let result = await Product.filter({ id: tempResult.id }).getJoin({
    category: { restaurant: { categories: { products: true } } }
  });

  return result[0];
}

export async function getProductByID(args) {
  let result = await Product.filter({ id: args.id })
    .getJoin({ category: true })
    .then(result => {
      console.log(result[0]);
      return result[0];
    });

  return result;
}

export async function getAllProductsByRestaurant() {
  let result = await Restaurant.getJoin({
    category: true,
    product: true
  }).then(result => {
    return result;
  });

  return result;
}

export async function addUrlToProduct(args) {
  const { productID, url } = args;

  var tempResult = await Product.filter({ id: productID }).then(user => {
    console.log(user);
    user[0].image_path = url;

    user[0].saveAll();
    return user[0];
  });

  var result = await Product.filter({ id: productID })
    .getJoin({
      category: { restaurant: { categories: { products: true  } } }
    })
    .then(result => {
      return result;
    });
  console.log(result);
  return result[0];
}
