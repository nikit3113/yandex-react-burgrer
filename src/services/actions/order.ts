import {GET_ORDER_NUMBER_FAILED, GET_ORDER_NUMBER_REQUEST, GET_ORDER_NUMBER_SUCCESS} from "../constants/order";
import {postOrder} from "../../api/api";
import {TArrayToSend} from "../../utils/types";
import {AppDispatch, AppThunk} from "../types";

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_NUMBER_REQUEST;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
  readonly orderNumber: string;
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_NUMBER_FAILED;
  readonly error: string;
}

export type TOrderActions =
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction;

export const dispatchOrderNumber: AppThunk = (ingredientIds: TArrayToSend) => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_ORDER_NUMBER_REQUEST,
  });
  postOrder(ingredientIds)
    .then((data) => {
      dispatch({
        type: GET_ORDER_NUMBER_SUCCESS,
        orderNumber: data.order.number
      })
    })
    .catch((error) => {
      dispatch({
        type: GET_ORDER_NUMBER_FAILED,
        error: error?.message
      })
    });

}