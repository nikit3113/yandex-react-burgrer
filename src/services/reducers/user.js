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
} from "../actions/user";

const initialState = {
  user: null,

  registerUserRequest: false,
  registerUserError: null,

  loginUserRequest: false,
  loginUserError: null,

  getUserRequest: false,
  getUserError: null,

  updateUserRequest: false,
  updateUserError: null,

  authIsChecked: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        registerUserRequest: true,
        registerUserError: false,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        user: action.data,
        registerUserRequest: false,
        registerUserError: null,
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
        loginUserError: false,
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        user: action.data,
        loginUserRequest: false,
        loginUserError: null,
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
        getUserError: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.data,
        getUserRequest: false,
        getUserError: null,
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
        updateUserError: false,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        user: action.data,
        updateUserRequest: false,
        updateUserError: null,
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
