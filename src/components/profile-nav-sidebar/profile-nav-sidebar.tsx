import React, {FC} from "react";
import styles from "./profile-nav-sidebar.module.css";
import {NavLink} from "react-router-dom";
import {logout} from "../../services/actions/user";
import {useDispatch} from "../../services/hooks";

const ProfileNavSidebar: FC<any> = () => {
  const dispatch = useDispatch();

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
      <div className={`mt-20`}>
        <p className={`text text_type_main-default text_color_inactive`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
    </nav>
  )
}

export default ProfileNavSidebar;
