import React from 'react';
import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function OrderDetails(props) {
  return (
    <div className={styles.root}>
      <span className={'text_type_digits-large mb-8'}>{props.orderNumber}</span>
      <p className={'text_type_main-medium mb-15'}>идентификатор заказа</p>
      <div className={styles.image}>
        <CheckMarkIcon type={'primary'}/>
      </div>
      <p className={'text_type_main-default mt-15'}>Ваш заказ начали готовить</p>
      <p className={'text_type_main-default mb-30 mt-2'}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails;
