import Product from "../../../models/product";

export async function addPrice(args) {


  const {
    product_ID,
    price,
    
  } = args;

  
  let product = await Product.filter({ id: product_ID }).then(result => {
    result[0].price = price
    result[0].saveAll().then(prod => {
      console.log(prod)
    });
    return result[0];
  });



  return product;
}
