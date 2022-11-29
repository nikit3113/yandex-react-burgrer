import {
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
} from '../constants/order';
import {orderReducer} from './order';


const initialState = {
  orderNumber: undefined,
  orderNumberRequest: false,
  orderNumberFailed: false,
}

const testOrderNumber = '321435'

describe('Проверка редьюсера wsReducer', () => {
  it('Проверка начального состояния', () => {
    expect(orderReducer(undefined, {})).toEqual(initialState);
  })
  it('Проверка редьюсера. GET_ORDER_NUMBER_REQUEST', () => {
    expect(orderReducer(initialState, {type: GET_ORDER_NUMBER_REQUEST})).toEqual({
      ...initialState,
      orderNumber: initialState.orderNumber,
      orderNumberRequest: true
    });
  })
  it('Проверка редьюсера. GET_ORDER_NUMBER_SUCCESS', () => {
    expect(orderReducer({...initialState, orderNumber: ''}, {
      type: GET_ORDER_NUMBER_SUCCESS,
      orderNumber: testOrderNumber
    })).toEqual({
      ...initialState,
      orderNumber: testOrderNumber,
      orderNumberRequest: false,
      orderNumberFailed: false,
    });
  })
  it('Проверка редьюсера. GET_ORDER_NUMBER_FAILED', () => {
    expect(orderReducer(initialState, {type: GET_ORDER_NUMBER_FAILED})).toEqual({
      ...initialState,
      orderNumberRequest: false,
      orderNumberFailed: true,
    });
  })
});
