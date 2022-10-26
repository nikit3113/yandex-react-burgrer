import React, {useRef} from "react";
import {ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-construcor.module.css';
import {useDrag, useDrop} from "react-dnd";
import {useHistory} from "react-router-dom";
import {TArrayToSend, TConstructorItem, TIngredient} from "../../utils/types";
import {Button} from "../fixed-ya-components-to-react18";
import {DELETE_INGREDIENT, SWAP_INGREDIENTS} from "../../services/constants/ingredient";
import {dispatchOrderNumber} from "../../services/actions/order";
import {addToConstructor} from "../../services/actions/ingredient";
import {useDispatch, useSelector} from "../../services/hooks";
import {RootState} from "../../services/types";


type TConstructorItemProps = JSX.IntrinsicElements["div"] & {
  ingredient: TConstructorItem;
};
const ConstructorItem = ({ingredient}: TConstructorItemProps) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const deleteItem = () => {
    dispatch({
      type: DELETE_INGREDIENT,
      id: ingredient.id,
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
    drop(item: any) {
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


type TBurgerConstructorProps = {
  openOrderModal: () => void
}
const BurgerConstructor = ({openOrderModal}: TBurgerConstructorProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {constructorItems} = useSelector((store: RootState) => store.ingredient);
  const {user} = useSelector((store: RootState) => store.user);
  const bun = constructorItems.find((item: TIngredient) => item.type === 'bun');
  const buttonDisabled = !constructorItems.length;

  const [{isHover}, dropTarget] = useDrop({
    accept: ['bun', 'sauce', 'main'],
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop({id}: any) {
      moveItem(id)
    },
  });


  const handleCheckoutButton = () => {
    if (!user) {
      history.push('/login');
      return;
    }
    const arrayToSend: TArrayToSend = {ingredients: [...constructorItems.map(((el: TIngredient) => el._id))]}
    dispatch(dispatchOrderNumber(arrayToSend));
    openOrderModal();
  }

  const cost = React.useMemo(() => {
    return constructorItems.reduce((prev: number, cur: TIngredient) => prev + cur.price, 0);
  }, [constructorItems]);

  const className = isHover ? constructorStyles.main_dropped : constructorStyles.main;

  const moveItem = (id: number) => {
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
        {constructorItems.map((ingredient: TConstructorItem) => ingredient.type !== 'bun' ?
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
        <Button disabled={buttonDisabled} onClick={handleCheckoutButton} htmlType={"button"}>Оформить заказ</Button>
      </span>
    </section>
  );
}


export default BurgerConstructor;
