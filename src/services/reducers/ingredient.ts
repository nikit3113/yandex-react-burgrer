import {TConstructorItem, TIngredient} from "../../utils/types";
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT, GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS, SWAP_INGREDIENTS
} from "../constants/ingredient";
import {TIngredientActions} from "../actions/ingredient";

type TIngredientState = {
  ingredients: Array<TIngredient>,
  ingredientsRequest: boolean,
  ingredientsFailed: boolean,

  constructorItems: Array<TConstructorItem>,
}

const initialState: TIngredientState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  constructorItems: [],
}


export const ingredientReducer = (state = initialState, action: TIngredientActions): TIngredientState => {
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
        ingredients: action.ingredients,
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
    case DELETE_INGREDIENT: {
      let index = state.constructorItems.map(item => item.id).indexOf(action.id);
      if (index === -1) return {...state}
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
      } as TConstructorItem;
      let constructorItems;
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


