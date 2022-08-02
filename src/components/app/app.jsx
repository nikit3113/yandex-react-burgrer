import React, {useEffect, useState} from 'react';
import appStyles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {dispatchIngredients} from "../../services/actions";
import {useDispatch} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Route, Switch, useHistory, useLocation} from "react-router-dom";
// pages
import {LoginPage} from "../../pages/login";
import {RegisterPage} from "../../pages/register";
import {ResetPasswordPage} from "../../pages/reset-password";
import {ForgotPasswordPage} from "../../pages/forgot-password";
import {NotFound404} from "../../pages/not-found/not-found";
import {ProfilePage} from "../../pages/profile/profile";
import {ProtectedRoute} from "../protected-route";
import {NonAuthRoute} from "../non-auth-route";

function App() {
  const [orderModal, setOrderModal] = useState({
    visible: false,
    orderNumber: undefined,
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(dispatchIngredients());
  }, []);

  function handleOpenOrderModal() {
    setOrderModal({visible: true});
  }

  function handleCloseOrderModal() {
    setOrderModal({...orderModal, visible: false});
  }

  const modalOrderDetails = () => {
    return (
      <Modal onClose={handleCloseOrderModal}>
        <OrderDetails orderNumber={orderModal.orderNumber}/>
      </Modal>
    );
  }

  const handleModalClose = () => {
    history.goBack();
  };

  return (
    <div className={appStyles.app}>
      <AppHeader/>
      <DndProvider backend={HTML5Backend}>
        <main className={appStyles.main}>
          <Switch location={background || location}>
            <Route path="/" exact={true}>
              <BurgerIngredients/>
              <BurgerConstructor
                openOrderModal={handleOpenOrderModal}
              />
              {orderModal.visible && (modalOrderDetails())}
            </Route>
            <ProtectedRoute path="/profile" exact={true}>
              <ProfilePage/>
            </ProtectedRoute>
            <NonAuthRoute path="/login" exact={true}>
              <LoginPage/>
            </NonAuthRoute>
            <NonAuthRoute path="/register" exact={true}>
              <RegisterPage/>
            </NonAuthRoute>
            <NonAuthRoute path="/forgot-password" exact={true}>
              <ForgotPasswordPage/>
            </NonAuthRoute>
            <NonAuthRoute path="/reset-password" exact={true}>
              <ResetPasswordPage/>
            </NonAuthRoute>
            <Route path='/ingredients/:ingredientId' exact>
              <div className={appStyles.ingredientDetails}>
                <IngredientDetails/>
              </div>
            </Route>
            <Route>
              <NotFound404/>
            </Route>
          </Switch>
          {background && (
            <Route path='/ingredients/:ingredientId'>
              <Modal
                textHeader={'Детали ингредиента'}
                onClose={handleModalClose}>
                <IngredientDetails/>
              </Modal>
            </Route>
          )}
        </main>
      </DndProvider>
    </div>
  );
}

export default App;
