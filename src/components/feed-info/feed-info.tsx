import feedStyles from "./feed-info.module.css";
import React, {FC} from "react";

type TFeedInfoProps = {
  readonly total?: number;
  readonly totalToday?: number;
  readonly readyOrders?: Array<number>;
  readonly inWorkOrders?: Array<number>;
}

const FeedInfo: FC<TFeedInfoProps> = ({total, totalToday, readyOrders, inWorkOrders}) => {
  const chunkSize = 10;
  let chunkReadyArray = [];
  let chunkInWorkArray = [];
  if (readyOrders){
    let j=0;
    for (let i = 0; i < readyOrders.length; i += chunkSize) {
      chunkReadyArray[j] = readyOrders.slice(i, i + chunkSize);
      j++;
    }
  }
  if (inWorkOrders){
    let j=0;
    for (let i = 0; i < inWorkOrders.length; i += chunkSize) {
      chunkInWorkArray[j] = inWorkOrders.slice(i, i + chunkSize);
      j++;
    }
  }

  return (
    <div className={feedStyles.main}>
      <div className={feedStyles.top_block}>
        <div className={feedStyles.container}>
          <span className="text_type_main-medium">Готовы:</span>
          <div className={feedStyles.chunk}>
          {chunkReadyArray?.map((chunk)=>(
            <div className={feedStyles.block}>
              {chunk?.map((number) => (
                <p className={"text_type_digits-default text_color_success"} key={number}>{number}</p>
                ))}
            </div>
          ))}
          </div>
        </div>
        <div className={feedStyles.container}>
          <span className="text_type_main-medium">В работе:</span>
          <div className={feedStyles.chunk}>
            {chunkInWorkArray?.map((chunk)=>(
              <div className={feedStyles.block}>
                {chunk?.map((number) => (
                  <p className={"text_type_digits-default text_color_success"} key={number}>{number}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={feedStyles.completed_block}>
        <span className="text_type_main-medium">Выполнено за все время:</span>
        <span className={`${feedStyles.text_shadow} text_type_digits-large`}>{total}</span>
      </div>

      <div className={feedStyles.completed_block}>
        <span className="text_type_main-medium">Выполнено за сегодня:</span>
        <span className={`${feedStyles.text_shadow} text_type_digits-large`}>{totalToday}</span>
      </div>
    </div>
  );
}

export default FeedInfo;
