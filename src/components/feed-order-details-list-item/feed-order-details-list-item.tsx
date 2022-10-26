import React, {PropsWithoutRef} from "react";
import styles from "../feed-order-details/feed-order-details.module.css";
import feedStyles from "../feed/feed.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const FileOrderDetailsListItem: React.FC<PropsWithoutRef<{
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
        <p className={'text text_type_main-default pl-4'}>{props.name}</p>
      </div>
      <span
        className={feedStyles.feed_item_card__price + ' text  text_type_digits-default mt-1 mb-1 ml-4'}
      >{props.count} x {props.price} <CurrencyIcon type={'primary'}/>
      </span>
    </div>
  );
}

export default FileOrderDetailsListItem;
