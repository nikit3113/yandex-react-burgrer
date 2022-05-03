import React, {useContext} from "react";
import {ConstructorElement, CurrencyIcon, DragIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-construcor.module.css';
import {ConstructorContext} from "../../services/constructorContext";
import PropTypes from "prop-types";
import {postOrder} from "../../api/api";

function BurgerConstructor(props) {
  const [{bun, filling}] = useContext(ConstructorContext);
  return (
    <section className={constructorStyles.main + ' pl-4 pr-4'}>
      {bun && <div className={constructorStyles.containerLockedIngredient + ' mt-25 mb-4 pl-8 mr-2'}>
        <ConstructorElement
          text={bun.name + ' (верх)'}
          thumbnail={bun.image}
          price={bun.price} type={'top'}
          isLocked={true}
        />
      </div>}
      <div className={constructorStyles.scrollView}>
        {filling.map((ingredient) =>
          <div
            className={constructorStyles.containerIngredient + ' mb-4 pl-8'}
            key={ingredient._id}
          >
            <div className={constructorStyles.dragIconContainer}>
              <DragIcon></DragIcon>
            </div>
            <ConstructorElement
              text={ingredient.name}
              thumbnail={ingredient.image}
              price={ingredient.price}
            />
          </div>
        )}
      </div>
      {bun && <div className={constructorStyles.containerLockedIngredient + ' pl-8 mr-2'}>
        <ConstructorElement
          text={bun.name + ' (низ)'}
          thumbnail={bun.image}
          price={bun.price} type={'bottom'}
          isLocked={true}
        />
      </div>}
      <span className={constructorStyles.rowTotal + " mt-10 mb-15 mr-2"}>
          <span className={constructorStyles.price + ' text text_type_digits-medium mt-1 mb-1 mr-10'}>
            {bun ?
              filling.reduce((prev, cur) => prev + cur.price, bun.price * 2) :
              filling.reduce((prev, cur) => prev + cur.price, 0)}
            <CurrencyIcon type={'primary'}/>
          </span>
          <Button onClick={() => {
            postOrder({ingredients: [bun._id, ...filling.map((el=> el._id))]})
              .then((data) => {
                console.log(data);
                props.openOrderModal(data.order.number);
              })
              .catch(() => console.log('error post order'))
          }}>Оформить заказ</Button>
        </span>
    </section>
  );
}


BurgerConstructor.propTypes = {
  openOrderModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
