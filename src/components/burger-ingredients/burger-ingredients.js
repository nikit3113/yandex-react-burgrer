import React from "react";
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burgrer-ingredients.module.css';
import data from './test-data.json';

const Tabs = () => {
  const [current, setCurrent] = React.useState('Булки')
  return (
    <div style={{
      display: 'flex',
      margin: '0 auto'
    }}>
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

const TabBuns = (props) => {
  const buns = data.filter(ingredient => ingredient.type === 'bun');
  const sauces = data.filter(ingredient => ingredient.type === 'sauce');
  const mains = data.filter(ingredient => ingredient.type === 'main');
  return (
    <div className={ingredientsStyles.scrollView}>
      <header className='text_type_main-medium mt-10'>Булки</header>
      <section className={[ingredientsStyles.grid, props.className].join(' ')}>
        {buns.map((bun, index) => <Ingredient key={index} data={bun}/>)}
      </section>
      <header className='text_type_main-medium mt-10'>Соусы</header>
      <section className={[ingredientsStyles.grid, props.className].join(' ')}>
        {sauces.map((sauce, index) => <Ingredient key={index} data={sauce}/>)}
      </section>
      <header className='text_type_main-medium mt-10'>Начинки</header>
      <section className={[ingredientsStyles.grid, props.className].join(' ')}>
        {mains.map((main, index) => <Ingredient key={index} data={main}/>)}
      </section>
    </div>
  )
}

const Ingredient = ({ data }) => {
  console.log(JSON.stringify(data));
  console.log(data.image);
  const image = (
    <img
      className={ingredientsStyles.img}
      src={data.image}
      alt={data.image}
    />
  );
  return (
    <div>
      <div style={{ display: "flex", position: "relative" }}>
        {data.__v ? <Counter count={data.__v}/> : null}
      </div>
      <div className={ingredientsStyles.imgContainer}>{image}</div>
      <div style={{ display: "flex", flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
        <p className="text text_type_main-medium" style={{ marginRight: '5px' }}>{data.price}</p>
        <CurrencyIcon type={'primary'}/>
      </div>
      <p className="text text_type_main-default">{data.name}</p>
    </div>
  )
}

class BurgerIngredients extends React.Component {
  render() {
    return (
      <main className={ingredientsStyles.main + ' mr-10'}>
        <header className="text text_type_main-large mt-10 mb-5">
          Собери бургер
        </header>
        <Tabs/>
        <TabBuns className="mt-10"></TabBuns>
      </main>
    );
  }
}

export default BurgerIngredients;
