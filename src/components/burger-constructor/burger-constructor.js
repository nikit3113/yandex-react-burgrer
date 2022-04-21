import React from "react";
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-construcor.module.css';
import data from '../burger-ingredients/test-data.json';


class BurgerConstructor extends React.Component {
  render() {
    return (
      <section className={constructorStyles.main + ' pl-4 pr-4'}>
        <div className={constructorStyles.containerLockedIngredient + ' mt-25 mb-4 pl-8 mr-2'}>
          <ConstructorElement
            text={data[0].name}
            thumbnail={data[0].image}
            price={data[0].price} type={'top'}
            isLocked={true}
          />
        </div>
        <div className={constructorStyles.scrollView}>
          {data.map((ingredient) =>
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
            text={data[0].name}
            thumbnail={data[0].image}
            price={data[0].price} type={'bottom'}
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

export default BurgerConstructor;
