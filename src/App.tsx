import React from 'react';
import './App.css';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import testData from './utils/testData';

function App() {
    return (
        <div className="App">
            <AppHeader/>
            <main style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <BurgerIngredients ingredients={testData}/>
                <BurgerConstructor bun={testData[0]} ingredients={testData}/>
            </main>
        </div>
    );
}

export default App;
