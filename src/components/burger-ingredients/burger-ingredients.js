import React, {useMemo, useRef} from "react";
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burgrer-ingredients.module.css';
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import {SET_CURRENT_ITEM} from "../../services/actions";

const Tabs = ({currentTab, setCurrentTab}) => {
  const onTabClick = (tab) => {
    setCurrentTab(tab);
    const headerCategory = document.getElementById(tab);
    if (headerCategory) headerCategory.scrollIntoView({behavior: 'smooth'});
  }
  return (
    <div className={ingredientsStyles.tabs}>
      <Tab value="buns" active={currentTab === 'buns'} onClick={onTabClick}>Булки</Tab>
      <Tab value="sauces" active={currentTab === 'sauces'} onClick={onTabClick}>Соусы</Tab>
      <Tab value="mains" active={currentTab === 'mains'} onClick={onTabClick}>Начинки</Tab>
    </div>
  )
}

const IngredientList = ({ingredients, setCurrentTab}) => {
  const buns = useMemo(() => ingredients.filter(ingredient => ingredient.type === 'bun'), [ingredients]);
  const sauces = useMemo(() => ingredients.filter(ingredient => ingredient.type === 'sauce'), [ingredients]);
  const mains = useMemo(() => ingredients.filter(ingredient => ingredient.type === 'main'), [ingredients]);

  const scrollRef = useRef(null),
    bunsHeaderRef = useRef(null),
    sauceHeaderRef = useRef(null),
    mainHeaderRef = useRef(null);

  const scrollHandler = () => {
    const scrollPosition = scrollRef.current.getBoundingClientRect().top;

    const bunsHeaderPosition = bunsHeaderRef.current.getBoundingClientRect().top;
    const saucesHeaderPosition = sauceHeaderRef.current.getBoundingClientRect().top;
    const mainsHeaderPosition = mainHeaderRef.current.getBoundingClientRect().top;

    const bunDiff = Math.abs(scrollPosition - bunsHeaderPosition);
    const sauceDiff = Math.abs(scrollPosition - saucesHeaderPosition);
    const mainDiff = Math.abs(scrollPosition - mainsHeaderPosition);

    if (bunDiff < sauceDiff) {
      setCurrentTab('buns');
    } else if (sauceDiff < mainDiff) {
      setCurrentTab('sauces');
    } else {
      setCurrentTab('mains');
    }
  };

  return (
    <div className={ingredientsStyles.scrollView + ' mt-10'} ref={scrollRef} onScroll={scrollHandler}>
      <IngredientsCategoryList title={'Булки'} ingredients={buns}
                               id={'buns'} refer={bunsHeaderRef}/>
      <IngredientsCategoryList title={'Соусы'} ingredients={sauces}
                               id={'sauces'} refer={sauceHeaderRef}/>
      <IngredientsCategoryList title={'Начинки'} ingredients={mains}
                               id={'mains'} refer={mainHeaderRef}/>
    </div>
  )
}

const IngredientsCategoryList = ({title, ingredients, id, refer}) => {
  const dispatch = useDispatch();
  return (
    <>
      <h1 className='text_type_main-medium' id={id} ref={refer}>{title}</h1>
      <div className={[ingredientsStyles.grid, 'mt-10'].join(' ')}>
        {ingredients.map((ingredient) =>
          <IngredientCard
            onClick={() => {
              dispatch(
                {
                  type: SET_CURRENT_ITEM,
                  item: ingredient,
                })
            }}
            key={ingredient._id}
            id={ingredient._id}
            text={ingredient.name}
            thumbnail={ingredient.image}
            price={ingredient.price}
            type={ingredient.type}
          />)}
      </div>
    </>
  )
}

const IngredientCard = ({text, thumbnail, price, onClick, id, type}) => {
  const count = useSelector(store => store.common.constructorItems).reduce((prev, cur) => cur._id === id ? ++prev : prev, 0);

  const [{opacity}, ref] = useDrag({
    type: type,
    item: {id},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  return (
    <div onClick={onClick} ref={ref} style={{opacity}}>
      <div className={ingredientsStyles.counter_container}>
        {!!count && <Counter count={count}/>}
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

function BurgerIngredients() {
  const {ingredients} = useSelector(store => store.common);
  const [currentTab, setCurrentTab] = React.useState('buns')
  return (
    <section className={ingredientsStyles.main + ' mr-10'}>
      <h1 className="text text_type_main-large mt-10 mb-5">Собери бургер</h1>
      <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab}/>
      <IngredientList
        ingredients={ingredients}
        setCurrentTab={setCurrentTab}>
      </IngredientList>
    </section>
  );
}

export default BurgerIngredients;
