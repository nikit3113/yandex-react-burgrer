import React, {useMemo} from "react";
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burgrer-ingredients.module.css';
import PropTypes from "prop-types";
import {IngredientPropType} from "../../utils/types";

const Tabs = () => {
  const [current, setCurrent] = React.useState('Булки')

  const onTabClick = (tab) => {
    setCurrent(tab);
    const headerCategory = document.getElementById(tab);
    if (headerCategory) headerCategory.scrollIntoView({behavior: 'smooth'});
  }
  return (
    <div className={ingredientsStyles.tabs}>
      <Tab value="buns" active={current === 'buns'} onClick={onTabClick}>Булки</Tab>
      <Tab value="sauces" active={current === 'sauces'} onClick={onTabClick}>Соусы</Tab>
      <Tab value="mains" active={current === 'mains'} onClick={onTabClick}>Начинки</Tab>
    </div>
  )
}

const IngredientList = ({ingredients, openIngredientModal}) => {
  const buns = useMemo(() => ingredients.filter(ingredient => ingredient.type === 'bun'), [ingredients]);
  const sauces = useMemo(() => ingredients.filter(ingredient => ingredient.type === 'sauce'), [ingredients]);
  const mains = useMemo(() => ingredients.filter(ingredient => ingredient.type === 'main'), [ingredients]);

  return (
    <div className={ingredientsStyles.scrollView + ' mt-10'}>
      <IngredientsCategoryList title={'Булки'} ingredients={buns} onIngredientClick={openIngredientModal}
                               id={'buns'}/>
      <IngredientsCategoryList title={'Соусы'} ingredients={sauces} onIngredientClick={openIngredientModal}
                               id={'sauces'}/>
      <IngredientsCategoryList title={'Начинки'} ingredients={mains} onIngredientClick={openIngredientModal}
                               id={'mains'}/>
    </div>
  )
}

const IngredientsCategoryList = ({title, ingredients, onIngredientClick, id}) => {
  return (
    <>
      <header className='text_type_main-medium' id={id}>{title}</header>
      <div className={[ingredientsStyles.grid, 'mt-10'].join(' ')}>
        {ingredients.map((ingredient) =>
          <IngredientCard
            onClick={() => onIngredientClick(ingredient)}
            key={ingredient._id}
            text={ingredient.name}
            thumbnail={ingredient.image}
            price={ingredient.price}
          />)}
      </div>
    </>
  )
}

const IngredientCard = ({text, thumbnail, price, count, onClick}) => {
  return (
    <div onClick={onClick}>
      <div className={ingredientsStyles.counter_container}>
        {count && <Counter count={count}/>}
      </div>
      <img className={ingredientsStyles.ingredient_card__image} src={thumbnail} alt={thumbnail}/>
      <span className={ingredientsStyles.ingredient_card__price + ' text  text_type_digits-default mt-1 mb-1'}>
        {price}
        <CurrencyIcon type={'primary'}/>
      </span>
      <span
        className={ingredientsStyles.ingredient_card__text + " text text_type_main-default pb-8"}>{text}</span>
    </div>
  )
}

function BurgerIngredients(props) {
  const {ingredients, openIngredientModal} = props;

  return (
    <section className={ingredientsStyles.main + ' mr-10'}>
      <header className="text text_type_main-large mt-10 mb-5">Собери бургер</header>
      <Tabs/>
      <IngredientList
        ingredients={ingredients}
        openIngredientModal={openIngredientModal}>
      </IngredientList>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(IngredientPropType)).isRequired,
  openIngredientModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;
