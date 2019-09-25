import {
  GET_MENU,
  ADD_CATEGORY,
  ADD_PRODUCT,
  ADD_URL_TO_PRODUCT,
  GET_ALL_ORDERS,
  ADD_PRICE
} from "./actions_types";
import { GRAPHQL_URL } from "../graphQLRoutes";

import axios from "axios";

export function getMenu(restaurantID) {
  return async function(dispatch) {
    try {
      const requestBody = {
        query: `
        {
          getCategoriesByRestaurantID(restaurantID: "${restaurantID}") {
            id
            name
            products {
              id
              name
              description
              type
              image_path
              price
            }
          }
        }         
          `
      };

      const { data } = await axios.post(GRAPHQL_URL, requestBody);

      if (data.errors) {
        console.log(data.errors);
      } else {
        const menu = await data.data.getCategoriesByRestaurantID;

        dispatch({
          type: GET_MENU,
          payload: {
            menu: menu,
            loading: false
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function addCategory(restaurantID, name) {
  return async function(dispatch) {
    try {
      const requestBody = {
        query: `
        mutation {
          addCategory(userInput: {restaurant_ID: "${restaurantID}", name: "${name}"}) {
            id
            name
            products {
              id
              name
              description
              type
              image_path
              price
            }
          }
        }
        
          `
      };

      const { data } = await axios.post(GRAPHQL_URL, requestBody);

      if (data.errors) {
        console.log(data.errors);
      } else {
        console.log(data.data.addCategory);
        dispatch({
          type: ADD_CATEGORY,
          payload: {
            menu: data.data.addCategory
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function addProduct(categoryID, product) {
  return async function(dispatch) {
    const { name, description, type, image_path } = product;

    try {
      const requestBody = {
        query: `
        mutation {
          addProduct(userInput: {name: "${name}", description: "${description}", type: "${type}", category_ID: "${categoryID}", image_path: "${image_path}"}) {
            category {
              restaurant {
                categories {
                  id
                  name
                  products {
                    id
                    name
                    description
                    type
                    image_path
                    price
                  }
                }
              }
            }
          }
        }
        
        `
      };

      const { data } = await axios.post(GRAPHQL_URL, requestBody);

      if (data.errors) {
        console.log(data.errors);
      } else {
        let categories = data.data.addProduct.category.restaurant.categories;
        dispatch({
          type: ADD_PRODUCT,
          payload: {
            menu: categories
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function addUrlToProduct(productID, url) {
  return async function(dispatch) {
    try {
      const requestBody = {
        query: `
        mutation {
          addUrlToProduct(productID: "${productID}", url: "${url}") {
            image_path
            category {
              restaurant {
                categories {
                  id
                  name
                  products {
                    id
                    name
                    description
                    type
                    image_path
                    price
                  }
                }
              }
            }
          }
        }
        `
      };

      const { data } = await axios.post(GRAPHQL_URL, requestBody);

      if (data.errors) {
        console.log(data.errors);
      } else {
        let categories =
          data.data.addUrlToProduct.category.restaurant.categories;
        dispatch({
          type: ADD_URL_TO_PRODUCT,
          payload: {
            menu: categories
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function getAllOrders(restaurantID) {
  return async function(dispatch) {
    console.log(restaurantID);
    try {
      const requestBody = {
        query: `
        {
          getRestaurantByID(restaurantID: "${restaurantID}") {
            id
            name
            orders {
              time
              total
              tableNumber
              id
              products {
                id
                name
                description
                type
                price
              }
            }
          }
        }
        `
      };

      const { data } = await axios.post(GRAPHQL_URL, requestBody);

      console.log(data.data.getRestaurantByID.orders);

      if (data.errors) {
        console.log(data.errors);
      } else {
        let orders = data.data.getRestaurantByID.orders;

        console.log(orders);

        dispatch({
          type: GET_ALL_ORDERS,
          payload: {
            orders: orders
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function addPrice(productID, price) {
  console.log("vor dispatch");
  return async function(dispatch) {
    try {
      const requestBody = {
        query: `
        mutation {
          addPrice(product_ID: "${productID}", price: ${price}) {
            name
            price
          }
        }
        
        `
      };

      const { data } = await axios.post(GRAPHQL_URL, requestBody);

      if (data.errors) {
        console.log(data.errors);
      } else {
        console.log("Menu Action");
        let price = data.data.addPrice;
        dispatch({
          type: ADD_PRICE,
          payload: {
            menu: price
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function deleteOrder(orderID) {
  return async function(dispatch) {
    try {
      const requestBody = {
        query: `
        mutation {
          deleteOrder(orderID: "${orderID}") {
            id
            total
          }
        }
        
        `
      };

      const { data } = await axios.post(GRAPHQL_URL, requestBody);

      if (data.errors) {
        console.log(data.errors);
      } else {
        console.log("Menu Action");
        let price = data.data.deleteOrder;
        dispatch({
          type: ADD_PRICE,
          payload: {
            menu: price
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}
