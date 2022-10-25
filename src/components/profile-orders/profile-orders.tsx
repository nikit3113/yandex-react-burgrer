import React, {FC, useEffect} from "react";
import {getCookie} from "../../utils/cookie";
import {useDispatch, useSelector} from "../../services/hooks";
import {WS_CLOSE, WS_OPEN} from "../../services/constants/ws";
import {RootState} from "../../services/types";
import Loader from "../loader/loader";
import FeedList from "../feed-list/feed-list";

const WS_URL_ORDER_PRIVATE = 'wss://norma.nomoreparties.space/orders';

const ProfileOrders: FC<any> = () => {
  const accessToken = getCookie('accessToken').slice(7);
  const dispatch = useDispatch();
  const {orders} = useSelector(((store: RootState) => store.ws));
  useEffect(
    () => {
      dispatch({
        type: WS_OPEN,
        payload: WS_URL_ORDER_PRIVATE + '?token=' + accessToken,
      });
      return () => {
        dispatch({type: WS_CLOSE})
      };
    },
    [dispatch]
  );

  if (!orders.length) return Loader();

  return (<FeedList orders={orders} isPublicList={false}/>);
}

export default ProfileOrders;
