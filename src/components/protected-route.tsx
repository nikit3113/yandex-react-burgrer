import {Redirect, Route, RouteProps} from "react-router-dom";
import {getCookie} from "../utils/cookie";
import {ReactNode, useEffect} from "react";
import {checkToken} from "../services/actions/user";
import Loader from "./loader/loader";
import {AUTH_CHECKOUT_IS_END} from "../services/constants/user";
import {useDispatch, useSelector} from "../services/hooks";
import {RootState} from "../services/types";


export function ProtectedRoute({path, exact, children}: RouteProps & { children?: ReactNode }) {
  const {user, authIsChecked} = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkToken());
    return (function cleanup() {
      dispatch({
        type: AUTH_CHECKOUT_IS_END,
      });
    })
  }, [dispatch]);

  if (!authIsChecked) {
    return (<Loader/>);
  }

  const tokenIsExist = !!getCookie('accessToken');

  return (
    <Route
      path={path}
      exact={exact}
      render={({location}) =>
        tokenIsExist && !!user ? (children) :
          (
            <Redirect
              to={{
                pathname: '/login',
                state: {from: location}
              }}
            />
          )
      }
    />
  );
}
