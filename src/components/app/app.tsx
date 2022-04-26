import React, {useEffect, useState} from 'react';
import appStyles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import testData from '../../utils/testData';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

const URL_API = 'https://norma.nomoreparties.space/';

function App() {
    const [state, setState] = useState({
        ingredients: [],
        isLoading: false,
        hasError: false
    });

    const [modalVisible, setModalVisible] = useState(true);


    console.log('app ' + JSON.stringify(state.ingredients,null,2));

    useEffect(() => {
            setState({...state, hasError: false, isLoading: true});
            fetch(URL_API + `api/ingredients`)
                .then(res => res.json())
                .then(ingredients => setState({...state, ingredients, isLoading: false}))
                .catch(e => setState({...state, isLoading: false, hasError: true}))

        }
        , []);

    function handleOpenModal() {
        setModalVisible(true);
    }

    function handleCloseModal() {
        setModalVisible(false);
    }


    const modalIngredientDetails = () => {
        return (
            <Modal
                textHeader={'Детали ингредиента'}
                onClose={handleCloseModal}
            >
                <IngredientDetails ingredient={testData[0]}></IngredientDetails>
            </Modal>
        );
    }
    const modalOrderDetails = () => {
        return (
            <Modal
                onClose={handleCloseModal}
            >
                <OrderDetails></OrderDetails>
            </Modal>
        );
    }

    return (
        <div className={appStyles.app}>
            <AppHeader/>
            <main className={appStyles.main}>
                <BurgerIngredients ingredients={testData}/>
                <BurgerConstructor bun={testData[0]} ingredients={testData.filter((el)=> el.type!=='bun')}/>
                {modalVisible && (modalIngredientDetails())}
            </main>
        </div>
    );
}

export default App;
