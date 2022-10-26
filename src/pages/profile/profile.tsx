import styles from './profile.module.css';
import React from "react";
import {Route, Switch, useHistory, useLocation} from "react-router-dom";
import ProfileNavSidebar from "../../components/profile-nav-sidebar/profile-nav-sidebar";
import ProfileEdit from "../../components/profile-edit/profile-edit";
import ProfileOrders from "../../components/profile-orders/profile-orders";
import Modal from "../../components/modal/modal";
import FeedOrderDetails from "../../components/feed-order-details/feed-order-details";
import appStyles from "../../components/app/app.module.css";


type TBackgroundLocation = {
  readonly background: any,
}

export function ProfilePage() {
  const location = useLocation<TBackgroundLocation | undefined>();
  const history = useHistory();
  const background = location.state && location.state.background;


  const handleModalClose = () => {
    history.goBack();
  };
  return (
    <div className={`${styles.container}`}>
      <Switch location={background || location}>
        <Route path={'/profile/orders/:orderId'} exact={true}>
          <div className={appStyles.ingredientDetails}>
            <FeedOrderDetails/>
          </div>
        </Route>
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
      {background && (
        <Route path='/profile/orders/:orderId'>
          <Modal
            onClose={handleModalClose}>
            <FeedOrderDetails/>
          </Modal>
        </Route>
      )}
    </div>
  )
}
