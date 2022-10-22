import {combineReducers} from "redux";
import {userReducer} from "./user";
import {ingredientReducer} from "./ingredient";
import {orderReducer} from "./order";
import {wsReducer} from "./ws";

export const rootReducer = combineReducers({
  ingredient: ingredientReducer,
  order: orderReducer,
  user: userReducer,
  ws: wsReducer,
});
