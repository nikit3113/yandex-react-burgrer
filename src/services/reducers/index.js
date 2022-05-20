import {combineReducers} from "redux";
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS, GET_ORDER_NUMBER_FAILED,
  GET_ORDER_NUMBER_REQUEST, GET_ORDER_NUMBER_SUCCESS, SET_CURRENT_ITEM, SWAP_INGREDIENTS, UNSET_CURRENT_ITEM
} from "../actions";

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  constructorItems: [],

  currentItem: undefined,

  orderNumber: undefined,
  orderNumberRequest: false,
  orderNumberFailed: false,
}

export const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredients: initialState.ingredients,
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
        orderNumber: initialState.orderNumber,
        orderNumberRequest: true,
      }
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.orderNumber,
        orderNumberRequest: false,
        orderNumberFailed: false,
        constructorItems: initialState.constructorItems,
      }
    }
    case SET_CURRENT_ITEM: {
      return {
        ...state,
        currentItem: action.item,
      }
    }
    case UNSET_CURRENT_ITEM: {
      return {
        ...state,
        currentItem: initialState.currentItem,
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
      let index = state.constructorItems.map(item => item.id).indexOf(action.payload.id);
      if (index===-1) return {...state}
      const constructorItems = [...state.constructorItems];
      constructorItems.splice(index, 1);
      return {
        ...state,
        constructorItems,
      };
    }
    case ADD_INGREDIENT: {
      const item = {
        ...state.ingredients.find(item => item._id === action.payload.id),
        id: action.payload.uuid,
      };
      let constructorItems = [];
      if (item.type === 'bun') {
        constructorItems = [...state.constructorItems.filter((item) => item.type !== 'bun'), item, item];
      } else {
        constructorItems = [...state.constructorItems, item];
      }
      return {
        ...state,
        constructorItems,
      };
    }
    case SWAP_INGREDIENTS: {
      const constructorItems = [...state.constructorItems];
      const mapId = constructorItems.map(item => item.id);
      const oldIndex = mapId.indexOf(action.payload.oldId);
      const newIndex = mapId.indexOf(action.payload.newId);
      const oldIngredient = constructorItems[oldIndex];
      constructorItems.splice(oldIndex, 1);
      constructorItems.splice(newIndex, 0, oldIngredient);
      return {
        ...state,
        constructorItems,
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
