import React, {FC} from "react";
import feedStyles from './feed.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import FeedInfo from "../feed-info/feed-info";

const items = [1, 2, 3, 4, 5, 6];
const itemsImage = [1, 2, 3, 4, 5, 6, 7];

type TFeedItemsProps = {
  readonly item: number;
}

const FeedItem: FC<TFeedItemsProps> = ({item}: TFeedItemsProps) => {
  return (
    <div className={feedStyles.feedItem}>
      <div className={feedStyles.feedItemContainer}>
        <span className="text_type_digits-default">#{324234 + item}</span>
        <span className="text text_type_main-default text_color_inactive">сегодня, 16:20 gmt +3</span>
      </div>
      <span className="text_type_main-medium">Burger name</span>
      <div className={feedStyles.feedItemContainer}>
        <div className={feedStyles.feedItemImages}>
          {itemsImage.map((src, index) => {
            if (index >= 6) return null;
            if (index === 5) return (
              <div
                className={feedStyles.feedItemLastImage}
                style={{
                  zIndex: itemsImage.length - index,
                  right: index * 16
                }}>
                <img
                  className={`${feedStyles.icon}`}
                  src={src.toString()}
                  key={index}
                  alt="img"
                />
                {(itemsImage.length > 6) && <span style={{
                  position: "relative",
                  right: 40
                }}>+{itemsImage.length - index - 1}</span>}
              </div>
            )
            return (
              <img
                className={`${feedStyles.icon}`}
                src={src.toString()}
                key={index}
                style={{zIndex: itemsImage.length - index, right: index * 16}}
                alt="img"
              />)
          })}
        </div>
        <span
          className={feedStyles.feed_item_card__price + ' text  text_type_digits-default mt-1 mb-1'}>
        {234}
          <CurrencyIcon type={'primary'}/>
          </span>
      </div>
    </div>
  )
}

const Feed = () => {
  return (
    <section style={{textAlign: 'left'}}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={feedStyles.main + ' mr-10'}>
        <div className={feedStyles.scrollView}>
          {items.map((num) => <FeedItem item={num}/>)}
        </div>
        <FeedInfo/>
      </div>
    </section>
  );
}

export default Feed;
