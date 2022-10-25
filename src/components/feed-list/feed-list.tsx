import React, {FC} from "react";
import styles from "../feed/feed.module.css";
import FeedItem from "../feed-item/feed-item";

type TFeedListProps = {
  readonly orders: Array<any>;
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
