import React, {FC} from "react";
import styles from "../feed/feed.module.css";
import FeedItem from "../feed-item/feed-item";

type TFeedListProps = {
  readonly orders: Array<any>;
  readonly publicList: boolean;
}

const FeedList: FC<TFeedListProps> = ({publicList, orders}) => {
  return (
    <div className={styles.scrollView}>
      {orders.map((order) => <FeedItem order={order} key={order._id} publicList={publicList}/>)}
    </div>
  )
}
export default FeedList
