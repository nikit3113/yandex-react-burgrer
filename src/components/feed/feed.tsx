import React, {FC, useEffect} from "react";
import feedStyles from './feed.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import FeedInfo from "../feed-info/feed-info";
import {WS_CLOSE, WS_OPEN} from "../../services/constants/ws";
import {useDispatch, useSelector} from "../../services/hooks";
import {RootState} from "../../services/types";
import Loader from "../loader/loader";
import {TOrder} from "../../services/types/data";
import {Link, useLocation} from "react-router-dom";

const WS_URL_ORDER_ALL = 'wss://norma.nomoreparties.space/orders/all';
const MAX_VISIBLE_IMAGES = 6;

type TFeedItemsProps = {
  readonly order: TOrder;
}

const FeedItem: FC<TFeedItemsProps> = ({order}) => {
  const {ingredients} = useSelector(((store: RootState) => store.ingredient));
  const ingredientsList = order.ingredients.map((value) => ingredients.find(({_id}) => _id == value))
  const price = ingredientsList.reduce((previousValue, currentValue) => {
    return currentValue ? previousValue + currentValue.price : previousValue;
  }, 0)

  const location = useLocation();
  return (
    <Link
      className={feedStyles.link}
      to={{
        pathname: 'feed/' + order._id,
        state: {background: location},
      }}
    >
      <div className={feedStyles.feedItem}>
        <div className={feedStyles.feedItemContainer}>
          <span className="text_type_digits-default">#{order.number}</span>
          <span
            className="text text_type_main-default text_color_inactive">{new Date(order.createdAt).toLocaleString()}</span>
        </div>
        <span className="text_type_main-medium">{order.name}</span>
        <div className={feedStyles.feedItemContainer}>
          <div className={feedStyles.feedItemImages}>
            {ingredientsList.map((ingredient, index) => {
              if (index >= MAX_VISIBLE_IMAGES) return null;
              if (index === MAX_VISIBLE_IMAGES - 1) return (
                <div
                  className={feedStyles.feedItemLastImage}
                  style={{
                    zIndex: MAX_VISIBLE_IMAGES - index,
                    right: index * 16
                  }}
                  key={index}>
                  <img
                    className={`${feedStyles.icon} ${feedStyles.icon_last}`}
                    src={ingredient?.image}
                    key={index}
                    alt="img"
                  />
                  {(ingredientsList.length > MAX_VISIBLE_IMAGES) && <span
                    className={feedStyles.text_add + ' text_type_digits-default'}>+{ingredientsList.length - index}</span>}
                </div>
              )
              return (
                <img
                  className={`${feedStyles.icon}`}
                  src={ingredient?.image}
                  key={index}
                  style={{zIndex: MAX_VISIBLE_IMAGES - index, right: index * 16}}
                  alt="img"
                />)
            })}
          </div>
          <span
            className={feedStyles.feed_item_card__price + ' text  text_type_digits-default mt-1 mb-1'}>
        {price}
            <CurrencyIcon type={'primary'}/>
          </span>
        </div>
      </div>

    </Link>
  )
}

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
    <section style={{textAlign: 'left'}}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={feedStyles.main + ' mr-10'}>
        <div className={feedStyles.scrollView}>
          {orders.map((order) => <FeedItem order={order} key={order._id}/>)}
        </div>
        <FeedInfo total={total} totalToday={totalToday} readyOrders={readyOrders} inWorkOrders={inWorkOrders}/>
      </div>
    </section>
  );
}

export default Feed;
