import {combineReducers} from "redux";
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS, GET_ORDER_NUMBER_FAILED,
  GET_ORDER_NUMBER_REQUEST, GET_ORDER_NUMBER_SUCCESS
} from "../actions";

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  constructor: [],

  orderNumber: undefined,
  orderNumberRequest: false,
  orderNumberFailed: false,
}

export const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.data,
        ingredientsRequest: false,
        ingredientsFailed: false,
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      }
    }
    case GET_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        orderNumberRequest: true,
      }
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.data,
        orderNumberRequest: false,
        orderNumberFailed: false,
      }
    }
    case GET_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        orderNumberRequest: false,
        orderNumberFailed: true,
      }
    }
    case DELETE_INGREDIENT: {
      let index = state.constructor.map(item => item._id).indexOf(action.id);
      const constructor = [...state.constructor];
      constructor.splice(index,1);
      return {
        ...state,
        constructor,
      };
    }
    case ADD_INGREDIENT: {
      const item = state.ingredients.find(item => item._id === action.id);
      let constructor = [];
      if (item.type === 'bun') {
        constructor = [...state.constructor.filter((item) => item.type !== 'bun'), item, item];
      } else {
        constructor = [...state.constructor, item];
      }
      return {
        ...state,
        constructor,
      };
    }
    default: {
      return state;
    }
  }
}

export const rootReducer = combineReducers({
  common: commonReducer,
});
