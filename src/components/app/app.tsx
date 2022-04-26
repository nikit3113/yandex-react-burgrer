import React from 'react';
import appStyles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import testData from '../../utils/testData';

function App() {
    return (
        <div className={appStyles.app}>
            <AppHeader/>
            <main className={appStyles.main}>
                <BurgerIngredients ingredients={testData}/>
                <BurgerConstructor bun={testData[0]} ingredients={testData.filter((el)=> el.type!=='bun')}/>
            </main>
        </div>
    );
}

export default App;
