import {
  GET_RESTAURANTS,
  ADD_RESTAURANT,
  SET_RESTAURANT
} from "./actions_types";
import axios from "axios";
import { GRAPHQL_URL } from "../graphQLRoutes";

export function updateRestaurants(buID) {
  return async function(dispatch) {
    try {
      const requestBody = {
        query: `
        {
          getRestaurantsByBU(businessUser_id: "${buID}") {
            name
            id
          }
        }
        
        `
      };

      const { data } = await axios.post(GRAPHQL_URL, requestBody);

      if (data.errors) {
        console.log(data.errors);
      } else {
        const restaurants = await data.data.getRestaurantsByBU;

        console.log(restaurants);
        dispatch({
          type: GET_RESTAURANTS,
          payload: {
            restaurants: restaurants
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}
export function setRestaurant(id) {
  return async function(dispatch) {
    try {
      const requestBody = {
        query: `
        {
          getRestaurantByID(restaurantID: "${id}") {
            id
            name
            address
          }
        }
        
        `
      };

      const { data } = await axios.post(GRAPHQL_URL, requestBody);

      console.log(data);

      if (data.errors) {
        console.log(data.errors);
      } else {
        const restaurant = await data.data.getRestaurantByID;

        console.log(restaurant);
        dispatch({
          type: SET_RESTAURANT,
          payload: {
            activeRestaurant: {
              id: restaurant.id,
              name: restaurant.name,
              address: restaurant.address
            }
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function addRestaurant(name, address, businessUser_ID) {
  return async function(dispatch) {
    try {
      const requestBody = {
        query: `
            mutation {
              addRestaurant(userInput: {
                name: "${name}",
                address: "${address}",
                businessUser_ID: "${businessUser_ID}"
              }){
                id
                name
              }
            }
          
          `
      };

      const { data } = await axios.post(GRAPHQL_URL, requestBody);

      if (data.errors) {
        console.log(data.errors);
      } else {
        const { id, name } = await data.data.addRestaurant;
        dispatch({
          type: ADD_RESTAURANT,
          payload: {
            activeRestaurant: { id: id, name: name }
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}
