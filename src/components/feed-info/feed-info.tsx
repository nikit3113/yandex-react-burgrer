import feedStyles from "./feed-info.module.css";
import React from "react";

const items = [243, 2123, 3123, 4324, 3415, 6234, 723];

const FeedInfo = () => {
  return (
    <div className={feedStyles.main}>
      <div className={feedStyles.top_block}>
        <div style={{flex: 1, flexDirection: "column"}}>
          <span className="text_type_main-medium">Готовы:</span>
          {items.map((number) => (<p className={"text_type_digits-default text_color_success"}>{number}</p>))}
        </div>
        <div style={{flex: 1}}>
          <span className="text_type_main-medium">В работе:</span>
          {items.map((number) => (<p className={"text_type_digits-default"}>{number}</p>))}
          <div></div>
        </div>
      </div>
      <div className={feedStyles.completed_block}>
        <span className="text_type_main-medium">Выполнено за все время:</span>
        <span className={`${feedStyles.text_shadow} text_type_digits-large`}>28753</span>
      </div>

      <div className={feedStyles.completed_block}>
        <span className="text_type_main-medium">Выполнено за сегодня:</span>
        <span className={`${feedStyles.text_shadow} text_type_digits-large`}>324</span>
      </div>
    </div>
  );
}

export default FeedInfo;