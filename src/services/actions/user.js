import {login, register, getUserApi, updateUserApi, saveTokens, logoutApi} from "../../api/api";
import {deleteCookie, setCookie} from "../../utils/cookie";

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const LOGOUT = 'LOGOUT';
export const AUTH_CHECKOUT_SUCCESS = 'AUTH_CHECKOUT_SUCCESS';
export const AUTH_CHECKOUT_IS_END = 'AUTH_CHECKOUT_IS_END';

export function registerUser(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST,
    })
    register(email, password, name)
      .then(({refreshToken, accessToken, user}) => {
        saveTokens(refreshToken, accessToken);
        dispatch({
          type: REGISTER_USER_SUCCESS,
          data: user,
        })
      })
      .catch((error) => {
        dispatch({
          type: REGISTER_USER_FAILED,
          error: error?.message
        })
      })
  }
}

export function loginUser(email, password) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST,
    })
    login(email, password)
      .then((data) => {
        setCookie('accessToken', data?.accessToken);
        localStorage.setItem('refreshToken', data?.refreshToken);
        dispatch({
          type: LOGIN_USER_SUCCESS,
          data: data?.user,
        })
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_USER_FAILED,
          error: error?.message
        })
      })
  }
}

export function logout() {
  return function (dispatch) {
    logoutApi().finally((data) => {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch({
        type: LOGOUT,
        data: data?.user,
      })
    })
  }
}

export function getUser() {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    })
    getUserApi()
      .then((data) => {
        dispatch({
          type: GET_USER_SUCCESS,
          data: data?.user,
        })
      })
      .catch((error) => {
        dispatch({
          type: GET_USER_FAILED,
          error: error?.message
        })
      })
  }
}

export function checkToken() {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    })
    getUserApi()
      .then((data) => {
        dispatch({
          type: GET_USER_SUCCESS,
          data: data?.user,
        })
        dispatch(
          {
            type: AUTH_CHECKOUT_SUCCESS,
          }
        )
      })
      .catch((error) => {
        dispatch({
          type: GET_USER_FAILED,
          error: error?.message
        })
        dispatch(
          {
            type: AUTH_CHECKOUT_SUCCESS,
          }
        )
      }) //todo finally срабатывает раньше чем выполняется then и catch... надо разобарться почему
  }
}

export function updateUser(name, email, password) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    })
    updateUserApi(name, email, password)
      .then((data) => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          data: data?.user,
        })
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_USER_FAILED,
          error: error?.message
        })
      })
  }
}
