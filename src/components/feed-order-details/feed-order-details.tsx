import React, {PropsWithoutRef} from 'react';
import styles from './feed-order-details.module.css'
import feedStyles from "../feed/feed.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const TestData = {
  number: '#32344',
  name: 'Black Hole Singularity spices burger',
  status: 'Выполнен',
  ingredients: [
    {name: 'Флюоресцентная булка R2-D3', price: 100, count: 3, img: 'Nikita'},
    {name: 'Филе Люминесцентного тетраодонтимформа', price: 200, count: 1, img: 'Shukalin'},
    {name: 'Сухарики', price: 3232, count: 4, img: 'Dmitrievich'},
    {name: 'Флюоресцентная булка R2-D3', price: 100, count: 3, img: 'Nikita'},
    {name: 'Филе Люминесцентного тетраодонтимформа', price: 200, count: 1, img: 'Shukalin'},
    {name: 'Сухарики', price: 3232, count: 4, img: 'Dmitrievich'},
  ],
  date: 'Вчера, 13:50 i-GMT+3',
}

const ListItem: React.FC<PropsWithoutRef<{
  name: string,
  price: number,
  count: number,
  img: string,
}>> = (props) => {
  return (
    <div className={styles.ingredient}>
      <div className={styles.ingredient_block}>
        <img
          className={styles.icon}
          src={props.img}
          alt="img"
        />
        <p className={'text text_type_main-small'}>{props.name}</p>
      </div>
      <span
        className={feedStyles.feed_item_card__price + ' text  text_type_digits-default mt-1 mb-1 ml-4'}
      >{props.count} x {props.price} <CurrencyIcon type={'primary'}/>
      </span>
    </div>
  );
}

function FeedOrderDetails() {
  return (
    <div className={styles.root}>
      <p className={'text_type_digits-default pt-4'} style={{textAlign: "center"}}>{TestData.number}</p>
      <p className={'text_type_main-medium pt-10'}>{TestData.name}</p>
      <p className={'text_type_main-small  text_color_success pt-3'}>{TestData.status}</p>
      <p className={'text_type_main-medium  pt-15 pb-6'}>Состав :</p>
      <div className={`${styles.ingredients_list} mb-15`}>
        {TestData.ingredients.map((item) => {
          return (<ListItem name={item.name} price={item.price} count={item.count} img={item.img}/>)
        })}
      </div>
      <div className={styles.bottom_block}>
        <span className="text text_type_main-default text_color_inactive">{TestData.date}</span>
        <span
          className={feedStyles.feed_item_card__price + ' text  text_type_digits-default mt-1 mb-1 ml-4'}
        >{TestData.ingredients.reduce((prev: number, {price, count}) => prev + price * count, 0)}< CurrencyIcon
          type={'primary'}/>
          </span>
      </div>
    </div>
  )
}

export default FeedOrderDetails;
