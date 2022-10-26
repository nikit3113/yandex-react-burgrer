import React, {FC} from "react";
import styles from "./feed-list.module.css";
import FeedItem from "../feed-item/feed-item";
import {TOrder} from "../../services/types/data";

type TFeedListProps = {
  readonly orders: Array<TOrder>;
  readonly isPublicList: boolean;
}

const FeedList: FC<TFeedListProps> = ({isPublicList, orders}) => {
  return (
    <div className={styles.scrollView}>
      {orders.map((order) => <FeedItem order={order} key={order._id} isPublicList={isPublicList}/>)}
    </div>
  )
}
export default FeedList
