import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {AppDispatch, AppThunk, RootState} from "./types";

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

// @ts-ignore todo WTF with AppTHunk?!
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();