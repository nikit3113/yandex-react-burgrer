import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
} from "../actions/user";

const initialState = {
  user: null,

  registerUserRequest: false,
  registerUserError: null,
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
    default: {
      return state;
    }
  }
}
