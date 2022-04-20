import React from "react";
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-construcor.module.css';
import data from '../burger-ingredients/test-data.json';


class BurgerConstructor extends React.Component {
  render() {
    return (
      <main className={constructorStyles.main + ' pl-4 pr-4'}>
        <section className='mt-25 mb-4 pl-8' style={{ display: "flex", alignItems: 'stretch' }}>
          <ConstructorElement
            text={data[0].name}
            thumbnail={data[0].image}
            price={data[0].price} type={'top'}
            isLocked={true}
          />
        </section>
        <section style={{ display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
          {data.map((ingredient, index) =>
            <div className='mb-4 pl-8' style={{ display: "flex", alignItems: 'stretch', position: "relative" }}>
              <div style={{ alignSelf: "center",position: 'absolute', left:0}}>
                <DragIcon></DragIcon>
              </div>
              <ConstructorElement
                key={ingredient._id}
                text={ingredient.name}
                thumbnail={ingredient.image}
                price={ingredient.price}
              />
            </div>
          )}
        </section>
        <section className='pl-8' style={{ display: "flex", alignItems: 'stretch' }}>
          <ConstructorElement
            text={data[0].name}
            thumbnail={data[0].image}
            price={data[0].price} type={'bottom'}
            isLocked={true}
          />
        </section>
        <section className="mt-10 mb-15" style={{ display: "flex", justifyContent: 'end', alignItems: 'center' }}>
          <div className="mr-10" style={{ display: "flex", height: '100%',alignItems:'center'}}>
            <p className="text text_type_digits-medium mr-3">610</p>
            <CurrencyIcon type={'primary'}/>
          </div>
          <Button>Оформить заказ</Button>
        </section>
      </main>
    );
  }
}

export default BurgerConstructor;
