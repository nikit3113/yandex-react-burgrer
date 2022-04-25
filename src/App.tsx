import React, {useEffect, useState} from 'react';
import './App.css';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import testData from './utils/testData';
import Modal from "./components/modal/modal";

const URL_API = 'https://norma.nomoreparties.space/';

function App() {
    const [state, setState] = useState({
        ingredients: [],
        isLoading: false,
        hasError: false
    });

    const [modalVisible, setModalVisible] = useState(true);

    function handleOpenModal() {
        setModalVisible(true);
    }

    function handleCloseModal() {
        setModalVisible(false);
    }

    const modal = () => {
        return (
            <Modal
                textHeader="Внимание!"
                onClose={handleCloseModal}
                >
                <p>Спасибо за внимание!</p>
                <p>Открывай меня, если станет скучно :)</p>
                <p>Открывай меня, если станет скучно :)</p>
                <p>Открывай меня, если станет скучно :)</p>
                <p>Открывай меня, если станет скучно :)</p>
            </Modal>
        );
    }

    useEffect(() => {
            setState({...state, hasError: false, isLoading: true});
            fetch(URL_API + `api/ingredients`)
                .then(res => res.json())
                .then(ingredients => setState({...state, ingredients, isLoading: false}))
                .catch(e => setState({...state, isLoading: false, hasError: true}))

        }
        , []);

    return (
        <div className="App">
            <AppHeader/>
            <main style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <BurgerIngredients ingredients={testData}/>
                <BurgerConstructor bun={testData[0]} ingredients={testData}/>
                {modalVisible && (modal())}
            </main>
        </div>
    );
}

export default App;
