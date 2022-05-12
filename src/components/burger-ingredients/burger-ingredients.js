import React from "react";
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burgrer-ingredients.module.css';
import PropTypes from "prop-types";
import {IngredientPropType} from "../../utils/types";

const Tabs = () => {
  const [current, setCurrent] = React.useState('Булки')

  return (
    <div className={ingredientsStyles.tabs}>
      <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>Булки</Tab>
      <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>Соусы</Tab>
      <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>Начинки</Tab>
    </div>
  )
}

const IngredientList = ({ingredients, openIngredientModal}) => {
  const buns = ingredients.filter(ingredient => ingredient.type === 'bun');
  const sauces = ingredients.filter(ingredient => ingredient.type === 'sauce');
  const mains = ingredients.filter(ingredient => ingredient.type === 'main');

  return (
    <div className={ingredientsStyles.scrollView + ' mt-10'}>
      <IngredientsCategoryList title={'Булки'} ingredients={buns} onIngredientClick={openIngredientModal}/>
      <IngredientsCategoryList title={'Соусы'} ingredients={sauces} onIngredientClick={openIngredientModal}/>
      <IngredientsCategoryList title={'Начинки'} ingredients={mains} onIngredientClick={openIngredientModal}/>
    </div>
  )
}

const IngredientsCategoryList = ({title, ingredients, onIngredientClick}) => {
  return (
    <>
      <header className='text_type_main-medium'>{title}</header>
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
        {count ? <Counter count={count}/> : null}
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
