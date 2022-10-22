import {WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_ON_MESSAGE,} from "../constants/ws";
import {TWsActions} from "../actions/ws";
import {TOrder} from "../types/data";

export type TWsState = {
  wsConnected: boolean;
  orders: Array<TOrder>;
  total?: number;
  totalToday?: number;
}

const initialState: TWsState = {
  wsConnected: false,
  orders: [],
  total: undefined,
  totalToday: undefined,
}

export const wsReducer = (state = initialState, action: TWsActions): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false
      };
    }
    case WS_ON_MESSAGE: {
      return {
        ...state,
        orders: action.payload.message.orders,
        total: action.payload.message.total,
        totalToday: action.payload.message.totalToday,
      };
    }
    default: {
      return state;
    }
  }
}
