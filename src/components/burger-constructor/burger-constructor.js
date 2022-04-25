import React from "react";
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-construcor.module.css';
import PropTypes from "prop-types";

class BurgerConstructor extends React.Component {
  render() {
    const bun = this.props.bun;
    const ingredients = this.props.ingredients;

    return (
      <section className={constructorStyles.main + ' pl-4 pr-4'}>
        <div className={constructorStyles.containerLockedIngredient + ' mt-25 mb-4 pl-8 mr-2'}>
          <ConstructorElement
            text={bun.name + ' (верх)'}
            thumbnail={bun.image}
            price={bun.price} type={'top'}
            isLocked={true}
          />
        </div>
        <div className={constructorStyles.scrollView}>
          {ingredients.map((ingredient) =>
            <div className={constructorStyles.containerIngredient + ' mb-4 pl-8'}>
              <div className={constructorStyles.dragIconContainer}>
                <DragIcon></DragIcon>
              </div>
              <ConstructorElement
                key={ingredient._id}
                text={ingredient.name}
                thumbnail={ingredient.image}
                price={ingredient.price}
              />
            </div>
          )}
        </div>
        <div className={constructorStyles.containerLockedIngredient + ' pl-8 mr-2'}>
          <ConstructorElement
            text={bun.name + ' (низ)'}
            thumbnail={bun.image}
            price={bun.price} type={'bottom'}
            isLocked={true}
          />
        </div>
        <span className={constructorStyles.rowTotal + " mt-10 mb-15 mr-2"}>
          <span className={constructorStyles.price + ' text text_type_digits-medium mt-1 mb-1 mr-10'}>
            {610}
            <CurrencyIcon type={'primary'}/>
          </span>
          <Button>Оформить заказ</Button>
        </span>
      </section>
    );
  }
}

BurgerConstructor.propTypes = {
  bun: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  }),
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  })),
};


export default BurgerConstructor;
