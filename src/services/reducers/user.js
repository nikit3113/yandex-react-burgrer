import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
} from "../actions/user";

const initialState = {
  user: null,

  registerUserRequest: false,
  registerUserError: null,

  loginUserRequest: false,
  loginUserError: null,
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
    default: {
      return state;
    }
  }
}
