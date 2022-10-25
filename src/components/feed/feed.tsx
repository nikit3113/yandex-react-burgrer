import React, {useEffect} from "react";
import feedStyles from './feed.module.css';
import FeedInfo from "../feed-info/feed-info";
import {WS_CLOSE, WS_OPEN} from "../../services/constants/ws";
import {useDispatch, useSelector} from "../../services/hooks";
import {RootState} from "../../services/types";
import Loader from "../loader/loader";
import FeedList from "../feed-list/feed-list";

const WS_URL_ORDER_ALL = 'wss://norma.nomoreparties.space/orders/all';
//todo move file to pages => FeedPage
const Feed = () => {
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch({
        type: WS_OPEN,
        payload: WS_URL_ORDER_ALL,
      });
      return () => {
        dispatch({type: WS_CLOSE})
      };
    },
    [dispatch]
  );
  const {orders, total, totalToday} = useSelector(((store: RootState) => store.ws));

  if (!orders.length) return Loader();

  const readyOrders: Array<number> = [];
  const inWorkOrders: Array<number> = [];

  orders.forEach((value) => {
    if (value.status === 'done') readyOrders.push(value.number)
    else inWorkOrders.push(value.number)
  })

  return (
    <section className={feedStyles.container}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={feedStyles.main + ' mr-10'}>
        <FeedList orders={orders} isPublicList={true}/>
        <FeedInfo total={total} totalToday={totalToday} readyOrders={readyOrders} inWorkOrders={inWorkOrders}/>
      </div>
    </section>
  );
}

export default Feed;
