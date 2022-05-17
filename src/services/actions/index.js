import {getIngredients, postOrder} from "../../api/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';


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
      .catch((error) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      })
  }
}

export function dispatchOrderNumber(ingredients_id) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST,
    });
    postOrder(ingredients_id)
      .then((data) => {
        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          orderNumber: data.order.number
        })
      })
      .catch((error) => {
        dispatch({
          type: GET_ORDER_NUMBER_FAILED
        })
      });
  }
}
