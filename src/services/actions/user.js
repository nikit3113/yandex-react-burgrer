import {register} from "../../api/api";
import {setCookie} from "../../utils/cookie";

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export function registerUser(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST,
    })
    register(email, password, name)
      .then((data) => {
        setCookie('accessToken', data?.accessToken);
        localStorage.setItem('refreshToken', data?.refreshToken);
        dispatch({
          type: REGISTER_USER_SUCCESS,
          data: data?.user,
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
