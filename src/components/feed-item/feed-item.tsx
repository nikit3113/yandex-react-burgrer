import React, {FC} from "react";
import {useSelector} from "../../services/hooks";
import {RootState} from "../../services/types";
import {Link, useLocation} from "react-router-dom";
import feedStyles from "./feed-item.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TOrder} from "../../services/types/data";

type TFeedItemsProps = {
  readonly order: TOrder;
  readonly publicList: boolean;
}
const MAX_VISIBLE_IMAGES = 6;

const FeedItem: FC<TFeedItemsProps> = ({order, publicList}) => {
  const {ingredients} = useSelector(((store: RootState) => store.ingredient));
  const ingredientsList = order.ingredients.map((value) => ingredients.find(({_id}) => _id == value))
  const price = ingredientsList.reduce((previousValue, currentValue) => {
    return currentValue ? previousValue + currentValue.price : previousValue;
  }, 0)
  const status = order.status === 'done' ? 'Выполнен' : order.status === 'pending' ? 'Готовиться' : order.status === 'created' ? 'Создан' : '';
  const orderTextColor = order.status === 'done' ? ' text_color_success' : '';
  const link = publicList ? 'feed/' + order._id : 'orders/' + order._id;

  const location = useLocation();
  return (
    <Link
      className={feedStyles.link}
      to={{
        pathname: link,
        state: {background: location},
      }}
    >
      <div className={feedStyles.feedItem}>
        <div className={feedStyles.feedItemContainer}>
          <span className="text_type_digits-default">#{order.number}</span>
          <span
            className="text text_type_main-default text_color_inactive">{new Date(order.createdAt).toLocaleString()}</span>
        </div>
        {!publicList && <span
          className={"text_type_main-small" + orderTextColor}>{status}</span>}
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

export default FeedItem
