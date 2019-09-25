import OrderedProduct from "../../../models/orderedProduct";
import Product from "../../../models/product";
import Price from "../../../models/price";
import Order from "../../../models/order";
//worked: removed amount
// testen
export async function addOrderedProduct(args) {
    const {
        product_ID,
        //price_ID,
        order_ID,
        wish
        
     } = args.userInput;
     console.log(product_ID);
    const tmpOrderedProduct = {
        product_id: product_ID,
        //price_id: price_ID,
        order_id: order_ID,
        specialWish: wish

      
    };

    let orderedProduct = new OrderedProduct(tmpOrderedProduct);

    let order = await Order.filter({
        id: order_ID
    })
     .then(result=>{
         return result[0];
     })
     .catch(err => console.log(err));
    console.log(orderedProduct)
    console.log(order);

     orderedProduct.order = order;
     //ist das ein fehler?
         order.orderedProducts = orderedProduct;


    let product = await Product.filter({
        id: product_ID
    })
      .then(result=>{
          return result[0];
      })
      .catch(err => console.log(err));

      orderedProduct.product = product;

      /*let price = await Price.filter({
          id: price_ID
      })
        .then(result => {
            return result[0];

        })
        .catch(err => console.log(err));

      orderedProduct.price = price;*/


    console.log(orderedProduct);

    let result = await orderedProduct
    .saveAll({product: true})
    .then(result => {
        return result;
    })
    .catch(err => console.log(err));

    
    return result;
}
export async function getOrderedProductsByRestaurant(args){
    console.log(args.restaurant_id);
    let result = await OrderedProduct.filter({
        restaurant_id: args.restaurant_id
    })
    .getJoin({ restaurant: true})// nicht sicher
    .then(resutl => {
        return result;
    });
    return result;

}