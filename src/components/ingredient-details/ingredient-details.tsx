import React, {useMemo} from 'react';
import styles from './ingredient-details.module.css'
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {TIngredient} from "../../utils/types";

function IngredientDetails() {
  const {ingredients} = useSelector((store: any) => store.common);
  const {ingredientId} = useParams<any>(); //todo fix any
  const ingredient = useMemo(() =>
      ingredients.find((ingredient: TIngredient) => ingredient._id === ingredientId)
    , [ingredientId, ingredients]);

  if (!ingredient) {
    return (
      <p className={'text_type_main-medium pt-4 pb-8'}>'Ингредиент не найден...'</p>
    );
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
