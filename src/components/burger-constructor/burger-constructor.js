import React, {useRef} from "react";
import {ConstructorElement, CurrencyIcon, DragIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-construcor.module.css';
import PropTypes from "prop-types";
import {useDrag, useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import {
  SWAP_INGREDIENTS,
  DELETE_INGREDIENT,
  addToConstructor,
  dispatchOrderNumber,
} from "../../services/actions";
import {ConstructorItemPropType} from "../../utils/types";

const ConstructorItem = ({ingredient}) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const deleteItem = () => {
    dispatch({
      type: DELETE_INGREDIENT,
      payload: {id: ingredient.id},
    });
  };

  const [{opacity}, dragRef] = useDrag({
    type: 'items',
    item: {id: ingredient.id},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  const [{isHover}, dropRef] = useDrop({
    accept: 'items',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      dispatch({
        type: SWAP_INGREDIENTS,
        payload: {
          oldId: item.id,
          newId: ingredient.id,
        }
      });
    },
  });

  const className = isHover ? constructorStyles.containerIngredientDropped : constructorStyles.containerIngredient;

  dragRef(dropRef(ref));

  return (
    <div
      className={className + ' mb-4 pl-8'}
      key={ingredient.id}
      ref={ref}
      style={{opacity}}
    >
      <div className={constructorStyles.dragIconContainer}>
        <DragIcon type={'primary'}/>
      </div>
      <ConstructorElement
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price}
        handleClose={() => deleteItem()}
      />
    </div>
  );
}

ConstructorItem.propTypes = {
  ingredient: PropTypes.shape(ConstructorItemPropType).isRequired,
};

function BurgerConstructor({openOrderModal}) {
  const dispatch = useDispatch();
  const {constructorItems} = useSelector(state => state.common);
  const bun = constructorItems.find((item) => item.type === 'bun');
  const buttonDisabled = !constructorItems.length;

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
    dispatch(dispatchOrderNumber({ingredients: [...constructorItems.map((el => el._id))]}));
    openOrderModal();
  }

  const cost = React.useMemo(() => {
    return constructorItems.reduce((prev, cur) => prev + cur.price, 0);
  }, [constructorItems]);

  const className = isHover ? constructorStyles.main_dropped : constructorStyles.main;

  const moveItem = (id) => {
    dispatch(addToConstructor(id));
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
        {constructorItems.map((ingredient) => ingredient.type !== 'bun' ?
          <ConstructorItem ingredient={ingredient} key={ingredient.id}/> : null)}
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
          <Button disabled={buttonDisabled} onClick={handleCheckoutButton}>Оформить заказ</Button>
        </span>
    </section>
  );
}

BurgerConstructor.propTypes = {
  openOrderModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
