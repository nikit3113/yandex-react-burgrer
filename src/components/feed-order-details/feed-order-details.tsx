import React, {PropsWithoutRef, useMemo} from 'react';
import styles from './feed-order-details.module.css'
import feedStyles from "../feed/feed.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "../../services/hooks";
import {RootState} from "../../services/types";
import {useParams} from "react-router-dom";

const ListItem: React.FC<PropsWithoutRef<{
  name?: string,
  price?: number,
  count?: number,
  img?: string,
}>> = (props) => {
  return (
    <div className={styles.ingredient}>
      <div className={styles.ingredient_block}>
        <img
          className={styles.icon}
          src={props.img}
          alt="img"
        />
        <p className={'text text_type_main-small pl-4'}>{props.name}</p>
      </div>
      <span
        className={feedStyles.feed_item_card__price + ' text  text_type_digits-default mt-1 mb-1 ml-4'}
      >{props.count} x {props.price} <CurrencyIcon type={'primary'}/>
      </span>
    </div>
  );
}

function FeedOrderDetails() {
  const {orders} = useSelector((store: RootState) => store.ws);
  const {ingredients} = useSelector((store: RootState) => store.ingredient)
  const {orderId} = useParams<{ orderId: string }>();
  const order = useMemo(() =>
      orders.find((order) => order._id === orderId)
    , [orderId, orders]);

  if (!order) {
    return (
      <p className={'text_type_main-medium pt-4 pb-8'}>'Заказ не найден...'</p>
    );
  }

  const result: any = {};
  order.ingredients.forEach((value) => {
    if (result[value] != undefined) {
      ++result[value];
    } else {
      result[value] = 1
    }
  })

  const ingredientsList: Array<any> = [];
  for (const key in result) {
    ingredientsList.push({...ingredients.find(({_id}) => _id == key), count: result[key]})
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
        {ingredientsList.map((item: any, index) => {
          return (
            <ListItem name={item?.name} price={item?.price} img={item?.image} count={item?.count} key={index}/>)
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
