import React, {FC} from "react";
import styles from "./profile-nav-sidebar.module.css";
import {NavLink, useRouteMatch} from "react-router-dom";
import {logout} from "../../services/actions/user";
import {useDispatch} from "../../services/hooks";

const PROFILE_PHRASE = 'В этом разделе вы можете изменить свои персональные данные';
const ORDER_PHRASE = 'В этом разделе вы можете просмотреть свою историю заказов';

const ProfileNavSidebar: FC<any> = () => {
  const dispatch = useDispatch();
  const rootIsProfileOrders = !!useRouteMatch('/profile/orders');

  const onLogout = () => {
    dispatch(logout());
  }

  return (
    <nav className={`${styles.links}`}>
      <NavLink
        to={"/profile"}
        exact={true}
        className={styles.link}
        activeClassName={styles.active_link}>
        <p className={'text text_type_main-medium mt-2 mb-2'}>Профиль</p>
      </NavLink>
      <NavLink
        to={"/profile/orders"}
        exact={true}
        className={styles.link}
        activeClassName={styles.active_link}>
        <p className={'text text_type_main-medium mt-2 mb-2'}>История заказов</p>
      </NavLink>
      <button className={styles.button + ' text_type_main-medium mt-2'} onClick={onLogout}>Выход</button>
      <div className={`mt-20`} style={{textAlign: "left"}}>
        <p className={`text text_type_main-default text_color_inactive mr-2`}>
          {rootIsProfileOrders ? ORDER_PHRASE : PROFILE_PHRASE}
        </p>
      </div>
    </nav>
  )
}

export default ProfileNavSidebar;
