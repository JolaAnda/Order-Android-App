import { combineReducers } from "redux";
import sessionReducer from "./sessions";
import menuReducer from "./menu";

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  menuState: menuReducer
});
export default rootReducer;
