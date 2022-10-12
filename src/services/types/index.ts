import {store} from "../store";
import {Action, ActionCreator} from "redux";
import {ThunkAction} from "redux-thunk";
import {TUserActions} from "../actions/user";
import {TIngredientActions} from "../actions/ingredient";
import {TOrderActions} from "../actions/order";

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions = TUserActions | TIngredientActions | TOrderActions;


export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
  >;
