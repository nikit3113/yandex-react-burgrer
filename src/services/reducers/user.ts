import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  LOGOUT,
  AUTH_CHECKOUT_SUCCESS,
  AUTH_CHECKOUT_IS_END,
} from "../constants/user";
import {TUserActions} from "../actions/user";
import {TUser} from "../types/data";

export type TUserState = {
  user: TUser | null;

  registerUserRequest: boolean;
  registerUserError: string;

  loginUserRequest: boolean;
  loginUserError: string;

  getUserRequest: boolean;
  getUserError: string;

  updateUserRequest: boolean;
  updateUserError: string;

  authIsChecked: boolean;
}

const initialState: TUserState = {
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
}

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        registerUserRequest: true,
        registerUserError: '',
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        registerUserRequest: false,
        registerUserError: '',
      };
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        registerUserRequest: false,
        registerUserError: action.error,
      };
    }
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        loginUserRequest: true,
        loginUserError: '',
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        loginUserRequest: false,
        loginUserError: '',
      };
    }
    case LOGIN_USER_FAILED: {
      return {
        ...state,
        loginUserRequest: false,
        loginUserError: action.error,
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserError: '',
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        getUserRequest: false,
        getUserError: '',
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserRequest: false,
        getUserError: action.error,
        user: null,
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
        updateUserError: '',
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        updateUserRequest: false,
        updateUserError: '',
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserError: action.error,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        user: null,
      };
    }
    case AUTH_CHECKOUT_SUCCESS: {
      return {
        ...state,
        authIsChecked: true,
      };
    }
    case AUTH_CHECKOUT_IS_END: {
      return {
        ...state,
        authIsChecked: false,
      };
    }
    default: {
      return state;
    }
  }
}
