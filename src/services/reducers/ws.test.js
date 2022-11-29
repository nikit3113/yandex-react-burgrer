import {
  WS_ON_MESSAGE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED
} from '../constants/ws';
import {wsReducer} from './ws';

const initialState = {
  wsConnected: false,
  orders: [],
  total: undefined,
  totalToday: undefined,
};

const testMessage = {
  message: {
    success: true,
    orders: [],
    total: 0,
    totalToday: 32,
  },
  timestamp: Date.now(),
}

describe('Проверка редьюсера wsReducer', () => {
  it('Проверка начального состояния', () => {
    expect(wsReducer(undefined, {type: 'test'})).toEqual(initialState);
  })
  it('Проверка редьюсера. WS_CONNECTION_SUCCESS', () => {
    expect(wsReducer(initialState, {type: WS_CONNECTION_SUCCESS})).toEqual({...initialState, wsConnected: true});
  })
  it('Проверка редьюсера. WS_CONNECTION_ERROR', () => {
    expect(wsReducer(initialState, {type: WS_CONNECTION_ERROR})).toEqual({...initialState, wsConnected: false});
  })
  it('Проверка редьюсера. WS_CONNECTION_CLOSED', () => {
    expect(wsReducer(initialState, {type: WS_CONNECTION_CLOSED})).toEqual({...initialState, wsConnected: false});
  })
  it('Проверка редьюсера. WS_ON_MESSAGE', () => {
    expect(wsReducer(initialState, {type: WS_ON_MESSAGE, payload: testMessage})).toEqual({
      ...initialState,
      orders: testMessage.message.orders,
      total: testMessage.message.total,
      totalToday: testMessage.message.totalToday,
    });
  })
});
