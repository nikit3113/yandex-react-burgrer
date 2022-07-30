import React from "react";
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyle from './app-header.module.css';
import {NavLink, useRouteMatch} from 'react-router-dom';

const LINK_MARGIN = 'p-5 mt-4 mb-4';

function AppHeader() {
  const rootIsConstructor = !!useRouteMatch({path: '/', exact: true});
  const rootIsFeed = !!useRouteMatch('/feed');
  const rootIsProfile = !!useRouteMatch('/profile');

  return (
    <header>
      <nav className={headerStyle.header}>
        <div className={headerStyle.leftSideMenu}>
          <NavLink
            to='/'
            className={[headerStyle.link, LINK_MARGIN].join(' ')}
            activeClassName={headerStyle.activeLink}
            exact
          >
            <BurgerIcon type={rootIsConstructor ? 'primary' : 'secondary'}/>
            <p className={'text text_type_main-default ml-2'}>Конструктор</p>
          </NavLink>

          <NavLink
            to='/feed'
            className={[headerStyle.link, LINK_MARGIN].join(' ')}
            activeClassName={headerStyle.activeLink}
            exact
          >
            <ListIcon type={rootIsFeed ? 'primary' : 'secondary'}/>
            <p className={'text text_type_main-default ml-2'}>Лента заказов</p>
          </NavLink>
        </div>

        <Logo/>

        <NavLink
          to='/profile'
          className={[headerStyle.link, LINK_MARGIN].join(' ')}
          activeClassName={headerStyle.activeLink}
        >
          <ProfileIcon type={rootIsProfile ? 'primary' : 'secondary'}/>
          <p className={'text text_type_main-default ml-2'}>Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;


