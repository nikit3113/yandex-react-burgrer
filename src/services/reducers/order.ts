import {TOrderActions} from "../actions/order";
import {GET_ORDER_NUMBER_FAILED, GET_ORDER_NUMBER_REQUEST, GET_ORDER_NUMBER_SUCCESS} from "../constants/order";

export type TOrderState = {
  orderNumber: string | undefined;
  orderNumberRequest: boolean;
  orderNumberFailed: boolean;
}

const initialState: TOrderState = {
  orderNumber: undefined,
  orderNumberRequest: false,
  orderNumberFailed: false,
}

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case GET_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        orderNumber: initialState.orderNumber,
        orderNumberRequest: true,
      };
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.orderNumber,
        orderNumberRequest: false,
        orderNumberFailed: false,
        //constructorItems: [], todo Add clear constructor action, add middleware
      }
    }
    case GET_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        orderNumberRequest: false,
        orderNumberFailed: true,
      }
    }
    default: {
      return state;
    }
  }
}