import * as restaurantResolver from "./resolverGenerator/restaurantResolver";
import * as userResolver from "./resolverGenerator/userResolver";
import * as businessUserResolver from "./resolverGenerator/businessUserResolver";
import * as categoryResolver from "./resolverGenerator/categoryResolver";
import * as productResolver from "./resolverGenerator/productResolver";
import * as priceResolver from "./resolverGenerator/priceResolver";
import * as paymentMethodResolver from "./resolverGenerator/paymentMethodResolver";
import * as orderResolver from "./resolverGenerator/orderResolver";
import * as orderedProductResolver from "./resolverGenerator/orderedProductResolver";
//Collects and exports all resolvers from exampleResolver folder

export default {
  ...restaurantResolver,
  ...userResolver,
  ...businessUserResolver,
  ...categoryResolver,
  ...productResolver,
  ...priceResolver,
  ...paymentMethodResolver,
  ...orderResolver,
  ...orderedProductResolver
};
