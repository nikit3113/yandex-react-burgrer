import React, {useMemo} from 'react';
import styles from './feed-order-details.module.css'
import feedStyles from "../feed/feed.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "../../services/hooks";
import {RootState} from "../../services/types";
import {useParams} from "react-router-dom";
import FileOrderDetailsListItem from "../feed-order-details-list-item/feed-order-details-list-item";
import {TIngredient} from "../../utils/types";

function FeedOrderDetails() {
  const {orders} = useSelector((store: RootState) => store.ws);
  const {ingredients} = useSelector((store: RootState) => store.ingredient)
  const {orderId} = useParams<{ orderId: string }>();
  const order = useMemo(() => orders.find((order) => order._id === orderId), [orderId, orders]);

  if (!order) {
    return (
      <p className={'text_type_main-medium pt-4 pb-8'}>'Заказ не найден...'</p>
    );
  }

  const result: { [id: string]: number } = {};
  order.ingredients.forEach((ingredient) => {
    if (result[ingredient] != undefined) {
      ++result[ingredient];
    } else {
      result[ingredient] = 1
    }
  })

  const ingredientsList: Array<TIngredient & { count: number }> = [];
  for (const key in result) {
    const ingredient = ingredients.find(({_id}) => _id == key);
    let ingredientWithCount = undefined;
    if (ingredient) {
      ingredientWithCount = {...ingredient, count: result[key]}
    }
    if (ingredientWithCount) ingredientsList.push(ingredientWithCount);
  }

  const price = ingredientsList.reduce((prev: number, {price, count}) => prev + price * count, 0);

  return (
    <div className={styles.root}>
      <p className={styles.order_number_text + ' text_type_digits-default pt-4'}>#{order.number}</p>
      <p className={'text_type_main-medium pt-10'}>{order.name}</p>
      <p
        className={'text_type_main-small  text_color_success pt-3'}>{order.status === 'done' ? 'Готов' : 'В работе'}</p>
      <p className={'text_type_main-medium  pt-15 pb-6'}>Состав :</p>
      <div className={`${styles.ingredients_list} mb-15`}>
        {ingredientsList.map((item, index) => {
          return (
            <FileOrderDetailsListItem name={item.name} price={item.price} img={item.image} count={item.count}
                                      key={index}/>)
        })}
      </div>
      <div className={styles.bottom_block}>
        <span
          className="text text_type_main-default text_color_inactive">{new Date(order.createdAt).toLocaleString()}</span>
        <span
          className={feedStyles.feed_item_card__price + ' text  text_type_digits-default mt-1 mb-1 ml-4'}
        >{price}< CurrencyIcon
          type={'primary'}/>
          </span>
      </div>
    </div>
  )
}

export default FeedOrderDetails;
