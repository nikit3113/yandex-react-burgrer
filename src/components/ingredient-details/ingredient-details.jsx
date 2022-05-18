import React from 'react';
import styles from './ingredient-details.module.css'
import {useSelector} from "react-redux";

function IngredientDetails() {
  const {currentItem} = useSelector(store => store.common);

  return (
    <div className={styles.root}>
      <img src={currentItem.image_large} alt={currentItem.name}/>
      <p className={'text_type_main-medium pt-4 pb-8'}>{currentItem.name}</p>
      <div className={`${styles.info} mb-15`}>
        <div className={styles.infoElem}>
          <span className="text_type_main-default mb-2">Калории,ккал</span>
          <span className="text_type_digits-default">{currentItem.calories}</span>
        </div>
        <div className={styles.infoElem}>
          <span className="text_type_main-default mb-2">Белки, г</span>
          <span className="text_type_digits-default">{currentItem.proteins}</span>
        </div>
        <div className={styles.infoElem}>
          <span className="text_type_main-default mb-2">Жиры, г</span>
          <span className="text_type_digits-default">{currentItem.fat}</span>
        </div>
        <div className={styles.infoElem}>
          <p className="text_type_main-default mb-2">Углеводы, г</p>
          <p className="text_type_digits-default">{currentItem.carbohydrates}</p>
        </div>
      </div>
    </div>
  )
}

export default IngredientDetails;
