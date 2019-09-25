import {
  GET_MENU,
  ADD_CATEGORY,
  SET_CATEGORY,
  ADD_PRODUCT,
  ADD_URL_TO_PRODUCT,
  GET_ALL_ORDERS,
  ADD_PRICE
} from "../actions/actions_types";

const INITIAL_STATE = {
  menu: [],
  loading: true,
  orders: []
};
function menuReducer(state = INITIAL_STATE, action) {
  console.log("menu reducer called");
  switch (action.type) {
    case GET_MENU: {
      return {
        ...state,
        menu: action.payload.menu,
        loading: action.payload.loading
      };
    }
    case ADD_CATEGORY: {
      return {
        ...state,
        menu: state.menu.concat(action.payload.menu),
        loading: action.payload.loading
      };
    }
    case ADD_PRODUCT: {
      console.log(action.payload.menu);
      return {
        ...state,
        menu: action.payload.menu
      };
    }
    case ADD_URL_TO_PRODUCT: {
      return {
        ...state,
        menu: action.payload.menu
      };
    }
    case GET_ALL_ORDERS: {
      return {
        ...state,
        orders: action.payload.orders
      };
    }
    case ADD_PRICE: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
}
export default menuReducer;
