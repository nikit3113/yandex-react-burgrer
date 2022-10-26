import React, {FC, useMemo, useRef} from "react";
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burger-ingredients.module.css';
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";
import {TIngredient} from "../../utils/types";
import {Tab} from "../fixed-ya-components-to-react18";
import {RootState} from "../../services/types";
import {useSelector} from "../../services/hooks";


type TTabsProps = {
  readonly currentTab: string;
  readonly setCurrentTab: (tab: string) => void;
};
const Tabs = ({currentTab, setCurrentTab}: TTabsProps) => {
  const onTabClick = (tab: string) => {
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

type TIngredientListProps = {
  readonly ingredients: Array<TIngredient>;
  readonly setCurrentTab: (tab: string) => void;
}
const IngredientList = ({ingredients, setCurrentTab}: TIngredientListProps) => {
  const buns = useMemo(() => ingredients?.filter((ingredient: TIngredient) => ingredient.type === 'bun'), [ingredients]);
  const sauces = useMemo(() => ingredients?.filter((ingredient: TIngredient) => ingredient.type === 'sauce'), [ingredients]);
  const mains = useMemo(() => ingredients?.filter((ingredient: TIngredient) => ingredient.type === 'main'), [ingredients]);

  const scrollRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null),
    bunsHeaderRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null),
    sauceHeaderRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null),
    mainHeaderRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const scrollHandler = () => {
    const scrollPosition = scrollRef.current?.getBoundingClientRect().top;
    const bunsHeaderPosition = bunsHeaderRef.current?.getBoundingClientRect().top;
    const saucesHeaderPosition = sauceHeaderRef.current?.getBoundingClientRect().top;
    const mainsHeaderPosition = mainHeaderRef.current?.getBoundingClientRect().top;

    if (scrollPosition === undefined) return;
    if (bunsHeaderPosition === undefined) return;
    if (saucesHeaderPosition === undefined) return;
    if (mainsHeaderPosition === undefined) return;

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


type TIngredientsCategoryListProps = {
  readonly title: string;
  readonly ingredients: Array<TIngredient>;
  readonly id: string;
  readonly refer: React.RefObject<HTMLDivElement>;
};
const IngredientsCategoryList = ({title, ingredients, id, refer}: TIngredientsCategoryListProps) => {
  return (
    <>
      <h1 className='text_type_main-medium' id={id} ref={refer}>{title}</h1>
      <div className={[ingredientsStyles.grid, 'mt-10'].join(' ')}>
        {ingredients?.map((ingredient: TIngredient) =>
          <IngredientCard
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


type TIngredientCardProps = {
  readonly text: string,
  readonly thumbnail: string,
  readonly price: number,
  readonly id: string,
  readonly type: string
}
const IngredientCard: FC<TIngredientCardProps> = ({text, thumbnail, price, id, type}: TIngredientCardProps) => {
  const count = useSelector((store) => store.ingredient.constructorItems).reduce(
    (prev: number, cur: TIngredient) => cur._id === id ? ++prev : prev, 0
  );
  const location = useLocation();

  const [{opacity}, ref] = useDrag({
    type: type,
    item: {id},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  return (
    <Link
      className={ingredientsStyles.link}
      to={{
        pathname: 'ingredients/' + id,
        state: {background: location},
      }}
    >
      <div ref={ref} style={{opacity}}>
        <div className={ingredientsStyles.counter_container}>
          {!!count && <Counter count={count}/>}
        </div>
        <img className={ingredientsStyles.ingredient_card__image} src={thumbnail} alt={thumbnail}/>
        <span
          className={ingredientsStyles.ingredient_card__price + ' text  text_type_digits-default mt-1 mb-1'}>
        {price}
          <CurrencyIcon type={'primary'}/>
          </span>
        <span
          className={ingredientsStyles.ingredient_card__text + " text text_type_main-default pb-8"}>{text}</span>
      </div>
    </Link>
  )
}

function BurgerIngredients() {
  const {ingredients} = useSelector((store: RootState) => store.ingredient);
  const [currentTab, setCurrentTab] = React.useState('buns')
  return (
    <section className={ingredientsStyles.main + ' mr-10'}>
      <h1 className="text text_type_main-large mt-10 mb-5">Собери бургер</h1>
      <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab}/>
      <IngredientList
        ingredients={ingredients}
        setCurrentTab={setCurrentTab}/>
    </section>
  );
}

export default BurgerIngredients;
