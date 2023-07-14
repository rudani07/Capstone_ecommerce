import { searchReducer } from "./searchReducer.js";
import { userReducer } from "./userReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
});

export default rootReducer;
