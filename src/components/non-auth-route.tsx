import {Redirect, Route, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "../utils/cookie";
import {useEffect} from "react";
import {AUTH_CHECKOUT_IS_END, checkToken} from "../services/actions/user";
import Loader from "./loader/loader";

type TNonAuthRouteProps = JSX.IntrinsicElements["div"] & {
  readonly path: string;
  readonly exact?: boolean;
};

export function NonAuthRoute({children, path}: TNonAuthRouteProps) {
  const {user, authIsChecked} = useSelector((store: any) => store.user);
  const dispatch = useDispatch();
  const {state} = useLocation<any>();
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
    <Route path={path}
           render={() =>
             tokenIsExist && !!user ? (<Redirect to={state?.from || "/"}/>) : (children)
           }
    />
  );
}
