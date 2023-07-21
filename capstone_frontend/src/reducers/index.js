import { cartReducer } from "./cartReducer.js";
import { drawerReducer } from "./drawerReducer.js";
import { searchReducer } from "./searchReducer.js";
import { userReducer } from "./userReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
});

export default rootReducer;
