import React from 'react';
import styles from './order-details.module.css';
import {useSelector} from "react-redux";
import Loader from "../loader/loader";

function OrderDetails() {
  const {orderNumber, orderNumberFailed, orderNumberRequest} = useSelector((store: any) => store.common);
  return (
    <div className={styles.root}>
      {orderNumberRequest ? (
        <div className={styles.loader + ' mb-15'}>
          <p className={'text_type_main-medium'}>Отправляем ваш заказ на кухню...</p>
          <Loader/>
        </div>
      ) : orderNumberFailed ?
        (<p className={'text_type_main-medium mb-15'}>К сожалению произошла какая то ошибка...</p>
        ) : (
          <>
            <span className={`${styles.title} text_type_digits-large mb-8`}>{orderNumber}</span>
            <p className={'text_type_main-medium mb-15'}>идентификатор заказа</p>
            <div className={styles.image}/>
            <p className={'text_type_main-default mt-15'}>Ваш заказ начали готовить</p>
            <p className={`${styles.waitingText} text_type_main-default mb-30 mt-2`}>Дождитесь готовности на орбитальной
              станции</p>
          </>)
      }
    </div>
  )
}

export default OrderDetails;
