import React from "react";
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burgrer-ingredients.module.css';
import PropTypes from "prop-types";
import { IngredientPropType } from "../../utils/types";

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

const IngredientList = (props) => {
  const buns = props.ingredients.filter(ingredient => ingredient.type === 'bun');
  const sauces = props.ingredients.filter(ingredient => ingredient.type === 'sauce');
  const mains = props.ingredients.filter(ingredient => ingredient.type === 'main');
  return (
    <div className={ingredientsStyles.scrollView + ' mt-10'}>
      <header className='text_type_main-medium'>Булки</header>
      <div className={[ingredientsStyles.grid, props.className].join(' ')}>
        {buns.map((bun) =>
          <IngredientCard
            key={bun._id}
            text={bun.name}
            thumbnail={bun.image}
            price={bun.price}
          />)}
      </div>
      <header className='text_type_main-medium mt-10'>Соусы</header>
      <div className={[ingredientsStyles.grid, props.className].join(' ')}>
        {sauces.map((sauce) =>
          <IngredientCard
            key={sauce._id}
            text={sauce.name}
            thumbnail={sauce.image}
            price={sauce.price}/>)}
      </div>
      <header className='text_type_main-medium mt-10'>Начинки</header>
      <div className={[ingredientsStyles.grid, props.className].join(' ')}>
        {mains.map((main) =>
          <IngredientCard
            key={main._id}
            text={main.name}
            thumbnail={main.image}
            price={main.price}/>)}
      </div>
    </div>
  )
}

const IngredientCard = (props) => {
  const { text, thumbnail, price } = props;

  return (
    <div>
      <div className={ingredientsStyles.counter_container}>
        {price ? <Counter count={price}/> : null}
      </div>
      <img className={ingredientsStyles.ingredient_card__image} src={thumbnail} alt={thumbnail}/>
      <span className={ingredientsStyles.ingredient_card__price + ' text  text_type_digits-default mt-1 mb-1'}>
        {price}
        <CurrencyIcon type={'primary'}/>
      </span>
      <span className={ingredientsStyles.ingredient_card__text + " text text_type_main-default pb-8"}>{text}</span>
    </div>
  )
}

class BurgerIngredients extends React.Component {
  render() {
    return (
      <section className={ingredientsStyles.main + ' mr-10'}>
        <header className="text text_type_main-large mt-10 mb-5">Собери бургер</header>
        <Tabs/>
        <IngredientList className="mt-10" ingredients={this.props.ingredients}></IngredientList>
      </section>
    );
  }
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(IngredientPropType)).isRequired,
};

export default BurgerIngredients;
