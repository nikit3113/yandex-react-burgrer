import React, {useEffect, useState} from 'react';
import appStyles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {dispatchIngredients, UNSET_CURRENT_ITEM} from "../../services/actions";
import {useDispatch, useSelector} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {LoginPage} from "../../pages/login";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {RegisterPage} from "../../pages/register";
import {ResetPasswordPage} from "../../pages/reset-password";
import {ForgotPasswordPage} from "../../pages/forgot-password";

function App() {
  const [orderModal, setOrderModal] = useState({
    visible: false,
    orderNumber: undefined,
  });
  const dispatch = useDispatch();
  const currentItem = useSelector(store => store.common.currentItem);

  useEffect(() => {
      dispatch(dispatchIngredients());
    }
    , []);

  function handleOpenOrderModal() {
    setOrderModal({visible: true});
  }

  function handleCloseOrderModal() {
    setOrderModal({...orderModal, visible: false});
  }

  const modalIngredientDetails = () => {
    const closeHandler = () => {
      dispatch(dispatch(
        {
          type: UNSET_CURRENT_ITEM,
        }))
    }
    return (
      <Modal
        textHeader={'Детали ингредиента'}
        onClose={closeHandler}
      >
        <IngredientDetails/>
      </Modal>
    );
  }
  const modalOrderDetails = () => {
    return (
      <Modal
        onClose={handleCloseOrderModal}
      >
        <OrderDetails orderNumber={orderModal.orderNumber}/>
      </Modal>
    );
  }

  return (
    <div className={appStyles.app}>
      <BrowserRouter>
        <AppHeader/>
        <DndProvider backend={HTML5Backend}>
          <main className={appStyles.main}>
            <Switch>
              <Route path="/login">
                <LoginPage></LoginPage>
              </Route>
              <Route path="/register">
                <RegisterPage></RegisterPage>
              </Route>
              <Route path="/forgot-password">
                <ForgotPasswordPage></ForgotPasswordPage>
              </Route>
              <Route path="/reset-password">
                <ResetPasswordPage></ResetPasswordPage>
              </Route>
              <Route path="/">
                <BurgerIngredients/>
                <BurgerConstructor
                  openOrderModal={handleOpenOrderModal}
                />
                {!!currentItem && (modalIngredientDetails())}
                {orderModal.visible && (modalOrderDetails())}
              </Route>
            </Switch>
          </main>
        </DndProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
