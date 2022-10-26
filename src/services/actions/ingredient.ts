import {
  ADD_INGREDIENT, DELETE_INGREDIENT,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS, SWAP_INGREDIENTS
} from "../constants/ingredient";
// @ts-ignore
import {v4 as uuid} from "uuid";
import {getIngredients} from "../../api/api";
import {TIngredient} from "../../utils/types";
import {AppDispatch, AppThunk} from "../types";

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: Array<TIngredient>;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
  readonly error: string;
}

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: { uuid: string, id: string };
}

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly id: string;
}

export interface ISwapIngredientAction {
  readonly type: typeof SWAP_INGREDIENTS;
  readonly payload: { oldId: string, newId: string };
}

export type TIngredientActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | IAddIngredientAction
  | IDeleteIngredientAction
  | ISwapIngredientAction;

export const dispatchIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  })
  getIngredients().then(ingredients => dispatch({
      type: GET_INGREDIENTS_SUCCESS,
      ingredients: ingredients.data,
    })
  )
    .catch((error) => {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
        error: error?.message
      });
    })
}

export function addToConstructor(ingredientId: number) {
  return {
    type: ADD_INGREDIENT,
    payload: {
      id: ingredientId,
      uuid: uuid(),
    }
  }
}
