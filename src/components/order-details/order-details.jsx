import React from 'react';
import styles from './order-details.module.css';

function OrderDetails(props) {
  return (
    <div className={styles.root}>
      <span className={`${styles.title} text_type_digits-large mb-8`}>{props.orderNumber}</span>
      <p className={'text_type_main-medium mb-15'}>идентификатор заказа</p>
      <div className={styles.image}/>
      <p className={'text_type_main-default mt-15'}>Ваш заказ начали готовить</p>
      <p className={`${styles.waitingText} text_type_main-default mb-30 mt-2`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails;
