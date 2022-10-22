import {Middleware} from "redux";
import {
  WS_CLOSE, WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_ON_MESSAGE,
  WS_OPEN
} from "../constants/ws";

export const socketMiddleware = (): Middleware => {
  return store => {
    let socket: WebSocket | null = null;
    return next => action => {
      const {dispatch} = store;
      const {type, payload} = action;
      if (type === WS_OPEN) {
        socket = new WebSocket(`${payload}`);
        socket.onopen = (event) => {
          dispatch({type: WS_CONNECTION_SUCCESS, payload: event});
        };
        socket.onerror = () => {
          dispatch({type: WS_CONNECTION_ERROR});
        };
        socket.onmessage = event => {
          const {data} = event;
          const objectMessage = JSON.parse(data);
          dispatch({
            type: WS_ON_MESSAGE, payload: {
              message: objectMessage,
              timestamp: new Date().getTime() / 1000
            }
          })
        };
        socket.onclose = () => {
          dispatch({type: WS_CONNECTION_CLOSED});
        };
      }
      if (type === WS_CLOSE) {
        socket?.close(1000, 'User close page');
      }
      next(action);
    };
  };
};
