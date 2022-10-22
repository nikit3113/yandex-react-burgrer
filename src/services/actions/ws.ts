import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_SEND_MESSAGE, WS_OPEN, WS_CLOSE,
  WS_ON_MESSAGE,
} from '../constants/ws'
import {TOrder} from "../types/data";

export interface IWsOpen {
  readonly type: typeof WS_OPEN;
}

export interface IWsClose {
  readonly type: typeof WS_CLOSE;
}

export interface IWsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: any;
}

export interface IWsOnMessage {
  readonly type: typeof WS_ON_MESSAGE;
  readonly payload: {
    message: {
      success: boolean,
      orders: Array<TOrder>,
      total: number,
      totalToday: number,
    },
    timestamp: number,
  };
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export type TWsActions =
  | IWsOpen
  | IWsClose
  | IWsSendMessage
  | IWsOnMessage
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed;
