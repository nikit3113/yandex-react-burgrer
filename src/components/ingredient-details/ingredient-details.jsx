import React, {useMemo} from 'react';
import styles from './ingredient-details.module.css'
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

function IngredientDetails() {
  const {ingredients} = useSelector(store => store.common);
  const {ingredientId} = useParams();
  const ingredient = useMemo(() => ingredients.find(ingredient => ingredient._id === ingredientId), [ingredients]);

  if (!ingredient) {
    return 'Ингредиент не найден...';
  }

  return (
    <div className={styles.root}>
      <img src={ingredient.image_large} alt={ingredient.name}/>
      <p className={'text_type_main-medium pt-4 pb-8'}>{ingredient.name}</p>
      <div className={`${styles.info} mb-15`}>
        <div className={styles.infoElem}>
          <span className="text_type_main-default mb-2">Калории,ккал</span>
          <span className="text_type_digits-default">{ingredient.calories}</span>
        </div>
        <div className={styles.infoElem}>
          <span className="text_type_main-default mb-2">Белки, г</span>
          <span className="text_type_digits-default">{ingredient.proteins}</span>
        </div>
        <div className={styles.infoElem}>
          <span className="text_type_main-default mb-2">Жиры, г</span>
          <span className="text_type_digits-default">{ingredient.fat}</span>
        </div>
        <div className={styles.infoElem}>
          <p className="text_type_main-default mb-2">Углеводы, г</p>
          <p className="text_type_digits-default">{ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  )
}

export default IngredientDetails;
