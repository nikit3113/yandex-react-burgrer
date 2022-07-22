import React, {useCallback} from "react";
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyle from './app-header.module.css';
import {useHistory} from 'react-router-dom';

const BUTTON_MARGIN = 'p-5 mt-4 mb-4 mr-2';

function MenuItem({icon, text, ...other}) {
  return (
      <button className={[headerStyle.menuItem, BUTTON_MARGIN].join(' ')} type='button' {...other}>
        {icon}
        <p className="text text_type_main-default ml-2">
          {text}
        </p>
      </button>
  );
}

function AppHeader() {
  const history = useHistory();
  const login = useCallback(
    () => {
      history.replace({pathname: '/login'});
    },
    [history]
  );
  return (
    <header className={headerStyle.header}>
      <nav className={headerStyle.menu}>
        <MenuItem text={'Конструктор'} icon={<BurgerIcon type={"primary"}/>}/>
        <MenuItem text={'Лента заказов'} icon={<ListIcon type={"primary"}/>}/>
      </nav>
      <Logo/>
      <MenuItem text={'Личный кабинет'} icon={<ProfileIcon type={"primary"}/>} onClick={login}/>
    </header>
  );
}

export default AppHeader;


