import React, {useEffect, useState} from 'react';
import appStyles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {ConstructorContext} from "../../services/constructorContext"
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {getIngredients} from "../../api/api";

function App() {
  const [ingredients, setIngredients] = useState({
    data: [],
    isLoading: false,
    hasError: false,
  });
  const [constructor, setConstructor] = useState({
    bun: undefined,
    filling: [],
  });
  const [orderModal, setOrderModal] = React.useState({
    visible: false,
    orderNumber: undefined,
  });
  const [ingredientModal, setIngredientModal] = React.useState({
    visible: false,
    ingredient: undefined,
  });


  useEffect(() => {
      setIngredients({...ingredients, hasError: false, isLoading: true});
      getIngredients().then(ingredients => {
            setIngredients({...ingredients, hasError: false, isLoading: false});
            setConstructor({bun: ingredients.data[0], filling: ingredients.data.filter(el => el.type !== 'bun')})
          }
        )
        .catch(() => {
          setIngredients({...ingredients, isLoading: false, hasError: true});
        })

    }
    , []);

  function handleOpenOrderModal(orderNumber) {
    setOrderModal({visible: true, orderNumber: orderNumber});
  }

  function handleCloseOrderModal() {
    setOrderModal({...orderModal, visible: false});
  }

  function handleOpenIngredientModal(ingredient) {
    setIngredientModal({visible: true, ingredient: ingredient});
  }

  function handleCloseIngredientModal() {
    setIngredientModal({...ingredientModal, visible: false});
  }

  const modalIngredientDetails = () => {
    return (
      <Modal
        textHeader={'Детали ингредиента'}
        onClose={handleCloseIngredientModal}
      >
        <IngredientDetails ingredient={ingredientModal.ingredient}></IngredientDetails>
      </Modal>
    );
  }
  const modalOrderDetails = () => {
    return (
      <Modal
        onClose={handleCloseOrderModal}
      >
        <OrderDetails orderNumber={orderModal.orderNumber}></OrderDetails>
      </Modal>
    );
  }

  return (
    <div className={appStyles.app}>
      <AppHeader/>
      <ConstructorContext.Provider value={[constructor, setConstructor]}>
        <main className={appStyles.main}>
          <BurgerIngredients
            ingredients={ingredients.data}
            openIngredientModal={handleOpenIngredientModal}
          />
          <BurgerConstructor
            openOrderModal={handleOpenOrderModal}
          />
          {ingredientModal.visible && (modalIngredientDetails(ingredientModal.ingredient))}
          {orderModal.visible && (modalOrderDetails(orderModal.orderNumber))}
        </main>
      </ConstructorContext.Provider>
    </div>
  );
}

export default App;
