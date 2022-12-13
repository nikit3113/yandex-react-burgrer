import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  UPDATE_USER_SUCCESS,
  LOGOUT,
  AUTH_CHECKOUT_SUCCESS,
  AUTH_CHECKOUT_IS_END,
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAILED
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
  it('Проверка редьюсера. LOGIN_USER_REQUEST', () => {
    expect(userReducer(initialState, {type: LOGIN_USER_REQUEST})).toEqual({...initialState, loginUserRequest: true});
  })
  it('Проверка редьюсера. LOGIN_USER_SUCCESS', () => {
    expect(userReducer(initialState, {type: LOGIN_USER_SUCCESS, user: testUser})).toEqual({
        ...initialState,
        user: testUser,
        loginUserRequest: false,
        loginUserError: '',
      }
    )
  })
  it('Проверка редьюсера. LOGIN_USER_FAILED', () => {
    expect(userReducer(initialState, {type: LOGIN_USER_FAILED, error: 'error'})).toEqual({
      ...initialState,
      loginUserRequest: false,
      loginUserError: 'error',
    })
  })
  it('Проверка редьюсера. REGISTER_USER_REQUEST', () => {
    expect(userReducer(initialState, {type: REGISTER_USER_REQUEST})).toEqual({
      ...initialState,
      registerUserRequest: true,
      registerUserError: '',
    });
  })
  it('Проверка редьюсера. REGISTER_USER_SUCCESS', () => {
    expect(userReducer(initialState, {type: REGISTER_USER_SUCCESS, user: testUser})).toEqual({
        ...initialState,
        user: testUser,
        registerUserRequest: false,
        registerUserError: '',
      }
    )
  })
  it('Проверка редьюсера. REGISTER_USER_FAILED', () => {
    expect(userReducer(initialState, {type: REGISTER_USER_FAILED, error: 'error'})).toEqual({
      ...initialState,
      registerUserRequest: false,
      registerUserError: 'error',
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
  it('Проверка редьюсера. UPDATE_USER_REQUEST', () => {
    expect(userReducer(initialState, {type: UPDATE_USER_REQUEST})).toEqual({
      ...initialState,
      updateUserRequest: true,
      updateUserError: '',
    });
  })
  it('Проверка редьюсера. UPDATE_USER_SUCCESS', () => {
    expect(userReducer(initialState, {type: UPDATE_USER_SUCCESS, user: testUser})).toEqual({
        ...initialState,
        user: testUser,
        updateUserRequest: false,
        updateUserError: '',
      }
    )
  })
  it('Проверка редьюсера. UPDATE_USER_FAILED', () => {
    expect(userReducer(initialState, {type: UPDATE_USER_FAILED, error: 'error'})).toEqual({
      ...initialState,
      updateUserRequest: false,
      updateUserError: 'error',
    })
  })
  it('Проверка редьюсера. LOGOUT', () => {
    expect(userReducer(initialState, {type: LOGOUT})).toEqual({
      ...initialState,
      user: null,
    })
  })
  it('Проверка редьюсера. AUTH_CHECKOUT_SUCCESS', () => {
    expect(userReducer(initialState, {type: AUTH_CHECKOUT_SUCCESS})).toEqual({
      ...initialState,
      authIsChecked: true,
    })
  })
  it('Проверка редьюсера. AUTH_CHECKOUT_IS_END', () => {
    expect(userReducer(initialState, {type: AUTH_CHECKOUT_IS_END})).toEqual({
      ...initialState,
      authIsChecked: false,
    })
  })
});
