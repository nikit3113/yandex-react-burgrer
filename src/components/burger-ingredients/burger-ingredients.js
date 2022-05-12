import React from "react";
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burgrer-ingredients.module.css';
import PropTypes from "prop-types";
import {IngredientPropType} from "../../utils/types";

const Tabs = () => {
  const [current, setCurrent] = React.useState('Булки')

  return (
    <div className={ingredientsStyles.tabs}>
      <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}

const IngredientList = ({ingredients, openIngredientModal, className}) => {
  const buns = ingredients.filter(ingredient => ingredient.type === 'bun');
  const sauces = ingredients.filter(ingredient => ingredient.type === 'sauce');
  const mains = ingredients.filter(ingredient => ingredient.type === 'main');

  return (
    <div className={ingredientsStyles.scrollView + ' mt-10'}>
      <header className='text_type_main-medium'>Булки</header>
      <div className={[ingredientsStyles.grid, className].join(' ')}>
        {buns.map((bun) =>
          <IngredientCard
            onClick={() => openIngredientModal(bun)}
            key={bun._id}
            text={bun.name}
            thumbnail={bun.image}
            price={bun.price}
          />)}
      </div>
      <header className='text_type_main-medium mt-10'>Соусы</header>
      <div className={[ingredientsStyles.grid, className].join(' ')}>
        {sauces.map((sauce) =>
          <IngredientCard
            onClick={() => openIngredientModal(sauce)}
            key={sauce._id}
            text={sauce.name}
            thumbnail={sauce.image}
            price={sauce.price}/>)}
      </div>
      <header className='text_type_main-medium mt-10'>Начинки</header>
      <div className={[ingredientsStyles.grid, className].join(' ')}>
        {mains.map((main) =>
          <IngredientCard
            onClick={() => openIngredientModal(main)}
            key={main._id}
            text={main.name}
            thumbnail={main.image}
            price={main.price}/>)}
      </div>
    </div>
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
        className="mt-10"
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
