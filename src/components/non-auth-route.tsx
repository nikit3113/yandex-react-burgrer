import {Redirect, Route, useLocation} from "react-router-dom";
import {getCookie} from "../utils/cookie";
import {useEffect} from "react";
import {checkToken} from "../services/actions/user";
import Loader from "./loader/loader";
import {AUTH_CHECKOUT_IS_END} from "../services/constants/user";
import {useDispatch, useSelector} from "../services/hooks";
import {RootState} from "../services/types";

type TNonAuthRouteProps = JSX.IntrinsicElements["div"] & {
  readonly path: string;
  readonly exact?: boolean;
};

export function NonAuthRoute({children, path}: TNonAuthRouteProps) {
  const {user, authIsChecked} = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();
  const {state} = useLocation<any>();
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
    <Route path={path}
           render={() =>
             tokenIsExist && !!user ? (<Redirect to={state?.from || "/"}/>) : (children)
           }
    />
  );
}
