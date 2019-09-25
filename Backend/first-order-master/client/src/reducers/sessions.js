import {
  SET_AUTH_USER,
  SET_RESTAURANT,
  ADD_RESTAURANT,
  GET_RESTAURANTS
} from "../actions/actions_types";

const INITIAL_STATE = {
  authUser: false,
  restaurants: [],
  activeRestaurant: null,
  loading: true
};
function sessionReducer(state = INITIAL_STATE, action) {
  //Hier geben wir an, wie der State je nach action type geändert werden soll
  console.log("session reducer called");
  switch (action.type) {
    case SET_AUTH_USER: {
      return {
        ...state,
        authUser: action.payload.authUser,
        restaurants: action.payload.restaurants,
        loading: false
      };
    }
    case SET_RESTAURANT: {
      return {
        ...state,
        activeRestaurant: action.payload.activeRestaurant
      };
    }
    case ADD_RESTAURANT: {
      return {
        ...state,
        activeRestaurant: action.payload.activeRestaurant
      };
    }
    case GET_RESTAURANTS: {
      return {
        ...state,
        restaurants: action.payload.restaurants
      };
    }

    default:
      return state;
  }
}
export default sessionReducer;
