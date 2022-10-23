import styles from './profile.module.css';
import React from "react";
import {Route, Switch, useLocation} from "react-router-dom";
import ProfileNavSidebar from "../../components/profile-nav-sidebar/profile-nav-sidebar";
import ProfileEdit from "../../components/profile-edit/profile-edit";
import ProfileOrders from "../../components/profile-orders/profile-orders";


type TBackgroundLocation = {
  readonly background: any,
}

export function ProfilePage() {
  const location = useLocation<TBackgroundLocation | undefined>();
  const background = location.state && location.state.background;

  return (
    <div className={`${styles.container}`}>
      <Switch location={background || location}>
        <Route path={'/'}>
          <ProfileNavSidebar/>
          <Switch location={background || location}>
            <Route path="/profile" exact={true}>
              <ProfileEdit/>
            </Route>
            <Route path="/profile/orders" exact={true}>
              <ProfileOrders/>
            </Route>
          </Switch>
        </Route>
      </Switch>
    </div>
  )
}
