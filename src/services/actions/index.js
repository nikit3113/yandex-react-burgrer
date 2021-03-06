import {getIngredients, postOrder} from "../../api/api";
import {v4 as uuid} from "uuid";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';

export const SET_CURRENT_ITEM = 'SET_CURRENT_ITEM';
export const UNSET_CURRENT_ITEM = 'UNSET_CURRENT_ITEM';

export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const SWAP_INGREDIENTS = 'SWAP_INGREDIENTS'


export function dispatchIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    })
    getIngredients().then(ingredients => dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        data: ingredients.data,
      })
    )
      .catch(() => {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      })
  }
}

export function dispatchOrderNumber(ingredientsId) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST,
    });
    postOrder(ingredientsId)
      .then((data) => {
        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          orderNumber: data.order.number
        })
      })
      .catch(() => {
        dispatch({
          type: GET_ORDER_NUMBER_FAILED
        })
      });
  }
}

export function addToConstructor(ingredientId) {
  return {
    type: ADD_INGREDIENT,
    payload: {
      id: ingredientId,
      uuid: uuid(),
    }
  }
}
