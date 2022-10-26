import {login, register, getUserApi, updateUserApi, saveTokens} from "../../api/api";
import {deleteCookie, setCookie} from "../../utils/cookie";
import {
  AUTH_CHECKOUT_IS_END,
  AUTH_CHECKOUT_SUCCESS, GET_USER_FAILED,
  GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_USER_FAILED,
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS,
  LOGOUT, REGISTER_USER_FAILED,
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS,
  UPDATE_USER_FAILED, UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS
} from "../constants/user";
import {TUser} from "../types/data";
import {AppDispatch, AppThunk} from "../types";

export interface IRegisterUserRequestAction {
  readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly user: TUser;
}

export interface IRegisterUserFailedAction {
  readonly type: typeof REGISTER_USER_FAILED;
  readonly error: string;
}

export interface ILoginUserRequestAction {
  readonly type: typeof LOGIN_USER_REQUEST;
}

export interface ILoginUserSuccessAction {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly user: TUser;
}

export interface ILoginUserFailedAction {
  readonly type: typeof LOGIN_USER_FAILED;
  readonly error: string;
}

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUser;
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
  readonly error: string;
}

export interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly user: TUser;
}

export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
  readonly error: string;
}

export interface ILogoutAction {
  readonly type: typeof LOGOUT;
}

export interface IAuthCheckoutSuccessAction {
  readonly type: typeof AUTH_CHECKOUT_SUCCESS;
}

export interface IAuthCheckoutIsEndAction {
  readonly type: typeof AUTH_CHECKOUT_IS_END;
}

export type TUserActions =
  | IRegisterUserRequestAction
  | IRegisterUserSuccessAction
  | IRegisterUserFailedAction
  | ILoginUserRequestAction
  | ILoginUserSuccessAction
  | ILoginUserFailedAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | IUpdateUserRequestAction
  | IUpdateUserSuccessAction
  | IUpdateUserFailedAction
  | ILogoutAction
  | IAuthCheckoutSuccessAction
  | IAuthCheckoutIsEndAction;

export const registerUser: AppThunk = (email: string, password: string, name: string) => (dispatch: AppDispatch) => {
  dispatch({
    type: REGISTER_USER_REQUEST,
  })
  register(email, password, name)
    .then(({refreshToken, accessToken, user}) => {
      saveTokens(refreshToken, accessToken);
      dispatch({
        type: REGISTER_USER_SUCCESS,
        user: user,
      })
    })
    .catch((error) => {
      dispatch({
        type: REGISTER_USER_FAILED,
        error: error?.message
      })
    })

}

export const loginUser: AppThunk = (email: string, password: string) => (dispatch: AppDispatch) => {
  {
    dispatch({
      type: LOGIN_USER_REQUEST,
    })
    login(email, password)
      .then((data) => {
        setCookie('accessToken', data?.accessToken);
        localStorage.setItem('refreshToken', data?.refreshToken);
        dispatch({
          type: LOGIN_USER_SUCCESS,
          user: data?.user,
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

export const logout: AppThunk = () => (dispatch: AppDispatch) => {
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
  dispatch({
    type: LOGOUT,
  })

}

export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_USER_REQUEST,
  })
  getUserApi()
    .then((data) => {
      dispatch({
        type: GET_USER_SUCCESS,
        user: data?.user,
      })
    })
    .catch((error) => {
      dispatch({
        type: GET_USER_FAILED,
        error: error?.message
      })
    })
}

export const checkToken: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_USER_REQUEST,
  })
  getUserApi()
    .then((data) => {
      dispatch({
        type: GET_USER_SUCCESS,
        user: data?.user,
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
    })
}

export const updateUser: AppThunk = (name: string, email: string, password: string) => (dispatch: AppDispatch) => {
  dispatch({
    type: UPDATE_USER_REQUEST,
  })
  updateUserApi(name, email, password)
    .then((data) => {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        user: data?.user,
      })
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_USER_FAILED,
        error: error?.message
      })
    })
}
