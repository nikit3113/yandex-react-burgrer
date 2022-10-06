import {Redirect, Route, RouteProps} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "../utils/cookie";
import {ReactNode, useEffect} from "react";
import {AUTH_CHECKOUT_IS_END, checkToken} from "../services/actions/user";
import Loader from "./loader/loader";


export function ProtectedRoute({path, exact, children}: RouteProps & {children?: ReactNode}) {
  const {user, authIsChecked} = useSelector((store: any) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(checkToken());
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
