import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyle from './app-header.module.css';

const BUTTON_MARGIN = 'p-5 mt-4 mb-4 mr-2';

class MenuItem extends React.Component {
  render() {
    return (
      <button className={[headerStyle.menuItem , BUTTON_MARGIN].join(' ')} type='button'>
        {this.props.icon}
        <p className="text text_type_main-default ml-2">
          {this.props.text}
        </p>
      </button>
    );
  }
}
class Button extends React.Component {
  render() {
    return (
      <button className={[headerStyle.menuItem , BUTTON_MARGIN].join(' ')} type='button'>
        {this.props.icon}
        <p className="text text_type_main-default ml-2">
          {this.props.text}
        </p>
      </button>
    );
  }
}

class AppHeader extends React.Component {
  render() {
    return (
      <header className={headerStyle.header}>
        <nav className={headerStyle.menu}>
          <MenuItem text={'Конструктор'} icon={<BurgerIcon type={"primary"}/>}/>
          <MenuItem text={'Лента заказов'} icon={<ListIcon type={"primary"}/>}/>
        </nav>
        <Logo></Logo>
        <Button text={'Личный кабинет'} icon={<ProfileIcon type={"primary"}/>}/>
      </header>
    );
  }
}

export default AppHeader;


