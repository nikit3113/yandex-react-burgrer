import React from 'react';
import PropTypes from "prop-types";
import styles from './ingredient-details.module.css'
import { IngredientPropType } from "../../utils/types";

function IngredientDetails(props) {
  if (!props.ingredient) return null;
  return (
    <div className={styles.root}>
      <img src={props.ingredient.image_large} alt={props.ingredient.name}/>
      <p className={'text_type_main-medium pt-4 pb-8'}>{props.ingredient.name}</p>
      <div className={`${styles.info} mb-15`}>
        <div className={styles.infoElem}>
          <span className="text_type_main-default mb-2">Калории,ккал</span>
          <span className="text_type_digits-default">{props.ingredient.calories}</span>
        </div>
        <div className={styles.infoElem}>
          <span className="text_type_main-default mb-2">Белки, г</span>
          <span className="text_type_digits-default">{props.ingredient.proteins}</span>
        </div>
        <div className={styles.infoElem}>
          <span className="text_type_main-default mb-2">Жиры, г</span>
          <span className="text_type_digits-default">{props.ingredient.fat}</span>
        </div>
        <div className={styles.infoElem}>
          <p className="text_type_main-default mb-2">Углеводы, г</p>
          <p className="text_type_digits-default">{props.ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  )
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape(IngredientPropType).isRequired
};

export default IngredientDetails;
