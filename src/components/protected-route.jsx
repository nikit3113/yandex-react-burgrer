import {Redirect, Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "../utils/cookie";
import {useEffect, useState} from "react";
import {AUTH_CHECKOUT_IS_END, checkToken} from "../services/actions/user";
import Loader from "./loader/loader";

export function ProtectedRoute({children, ...rest}) {
  const {user, authIsChecked} = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkToken());
    return (function cleanup() {
      dispatch({
        type: AUTH_CHECKOUT_IS_END,
      });
    })
  }, []);

  if (!authIsChecked) {
    return (<Loader/>);
  }

  const tokenIsExist = !!getCookie('accessToken');

  return (
    <Route {...rest}
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
