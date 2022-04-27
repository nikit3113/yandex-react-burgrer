import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import testData from '../../utils/testData';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

const API_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ingredients, setIngredients] = useState({
    data: [],
    isLoading: false,
    hasError: false
  });
  const [orderModalVisible, setOrderModalVisible] = React.useState(false);
  const [ingredientModal, setIngredientModal] = React.useState({
    visible: false,
    ingredient: undefined
  });


  useEffect(() => {
      setIngredients({ ...ingredients, hasError: false, isLoading: true });
      fetch(API_INGREDIENTS)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(ingredients => {
            setIngredients({ ...ingredients, hasError: false, isLoading: false });
          }
        )
        .catch(() => {
          setIngredients({ ...ingredients, isLoading: false, hasError: true });
        })

    }
    , []);

  function handleOpenOrderModal() {
    setOrderModalVisible(true);
  }

  function handleCloseOrderModal() {
    setOrderModalVisible(false);
  }

  function handleOpenIngredientModal(ingredient) {
    setIngredientModal({ visible: true, ingredient: ingredient });
  }

  function handleCloseIngredientModal() {
    setIngredientModal({ ...ingredientModal, visible: false});
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
        <OrderDetails></OrderDetails>
      </Modal>
    );
  }

  return (
    <div className={appStyles.app}>
      <AppHeader/>
      <main className={appStyles.main}>
        <BurgerIngredients
          ingredients={ingredients.data}
          openIngredientModal={handleOpenIngredientModal}
        />
        <BurgerConstructor
          bun={ingredients.data[0]}
          openOrderModal={handleOpenOrderModal}
          ingredients={ingredients.data.filter(el => el.type !== 'bun')}
        />
        {ingredientModal.visible && (modalIngredientDetails(ingredientModal.ingredient))}
        {orderModalVisible && (modalOrderDetails())}
      </main>
    </div>
  );
}

export default App;
