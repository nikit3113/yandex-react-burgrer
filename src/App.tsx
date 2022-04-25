import React, {useEffect, useState} from 'react';
import './App.css';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import testData from './utils/testData';
import Modal from "./components/modal/modal";
import OrderDetails from "./components/order-details/order-details";
import IngredientDetails from "./components/ingredient-details/ingredient-details";

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
        <div className="App">
            <AppHeader/>
            <main style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <BurgerIngredients ingredients={testData}/>
                <BurgerConstructor bun={testData[0]} ingredients={testData}/>
                {modalVisible && (modalIngredientDetails())}
            </main>
        </div>
    );
}

export default App;
