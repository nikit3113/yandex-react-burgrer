import React from "react";
import {ConstructorElement, CurrencyIcon, DragIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-construcor.module.css';
import PropTypes from "prop-types";
import {postOrder} from "../../api/api";
import {useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import {ADD_INGREDIENT, DELETE_INGREDIENT} from "../../services/actions";

function BurgerConstructor(props) {
  const {openOrderModal} = props;
  const dispatch = useDispatch();
  const {constructor} = useSelector(state => state.common);
  const bun = constructor.find((item)=>item.type==='bun');
  const filling = constructor.filter((item)=>item.type!=='bun');

  const [{isHover}, dropTarget] = useDrop({
    accept: ['bun', 'sauce', 'main'],
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop({id}) {
      moveItem(id)
    },
  });

  function handleCheckoutButton() {
    postOrder({ingredients: [...constructor.map((el => el._id))]})
      .then((data) => {
        openOrderModal(data.order.number);
      })
      .catch(() => alert('Error: checkout failed'))
  }

  const cost = React.useMemo(() => {
    return constructor.reduce((prev, cur) => prev + cur.price, 0);
  }, [constructor]);

  const className = isHover ? constructorStyles.main_dropped : constructorStyles.main;

  const moveItem = (id) => {
    dispatch({
      type: ADD_INGREDIENT,
      id
    });
  };

  const deleteItem = (id) => {
    dispatch({
      type: DELETE_INGREDIENT,
      id,
    });
  };

  return (
    <section className={className + ' pl-4 pr-4'} ref={dropTarget}>
      {bun && <div className={constructorStyles.containerLockedIngredient + ' mt-25 mb-4 pl-8 mr-2'}>
        <ConstructorElement
          text={bun.name + ' (верх)'}
          thumbnail={bun.image}
          price={bun.price} type={'top'}
          isLocked={true}
        />
      </div>}
      <div className={constructorStyles.scrollView}>
        {filling.map((ingredient, index) =>
          <div
            className={constructorStyles.containerIngredient + ' mb-4 pl-8'}
            key={index}
          >
            <div className={constructorStyles.dragIconContainer}>
              <DragIcon></DragIcon>
            </div>
            <ConstructorElement
              text={ingredient.name}
              thumbnail={ingredient.image}
              price={ingredient.price}
              handleClose={() => deleteItem(ingredient._id)}
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
            {cost}
            <CurrencyIcon type={'primary'}/>
          </span>
          <Button onClick={handleCheckoutButton}>Оформить заказ</Button>
        </span>
    </section>
  );
}


BurgerConstructor.propTypes = {
  openOrderModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
