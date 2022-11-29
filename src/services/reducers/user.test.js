import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED,
} from '../constants/user';
import {userReducer} from './user';

const initialState = {
  user: null,

  registerUserRequest: false,
  registerUserError: '',

  loginUserRequest: false,
  loginUserError: '',

  getUserRequest: false,
  getUserError: '',

  updateUserRequest: false,
  updateUserError: '',

  authIsChecked: false,
};

const testUser = {
  _id: 'id',
  ingredients: ['niko', 'kiko'],
  status: 'okey',
  name: 'Nikita',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  number: 32,
}

describe('Проверка редьюсера userReducer', () => {
  it('Проверка начального состояния', () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  })
  it('Проверка редьюсера. IS_REQUESTING', () => {
    expect(userReducer(initialState, {type: LOGIN_USER_REQUEST})).toEqual({...initialState, loginUserRequest: true});
  })
  it('Проверка редьюсера. IS_SUCCESSFUL', () => {
    expect(userReducer(initialState, {type: LOGIN_USER_SUCCESS, user: testUser})).toEqual({
        ...initialState,
        user: testUser,
        loginUserRequest: false,
        loginUserError: '',
      }
    )
  })
  it('Проверка редьюсера. IS_FAILED', () => {
    expect(userReducer(initialState, {type: LOGIN_USER_FAILED, error: 'error'})).toEqual({
      ...initialState,
      loginUserRequest: false,
      loginUserError: 'error',
    })
  })
  it('Проверка редьюсера. GET_USER_REQUEST', () => {
    expect(userReducer(initialState, {type: GET_USER_REQUEST})).toEqual({
      ...initialState,
      getUserRequest: true,
      getUserError: ''
    });
  })
  it('Проверка редьюсера. GET_USER_SUCCESS', () => {
    expect(userReducer(initialState, {type: GET_USER_SUCCESS, user: testUser})).toEqual({
        ...initialState,
        user: testUser,
        getUserRequest: false,
        getUserError: '',
      }
    )
  })
  it('Проверка редьюсера. GET_USER_FAILED', () => {
    expect(userReducer(initialState, {type: GET_USER_FAILED, error: 'error'})).toEqual({
      ...initialState,
      getUserRequest: false,
      getUserError: 'error',
      user: null,
    })
  })
});
