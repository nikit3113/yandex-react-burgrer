import {combineReducers} from "redux";

const initialState = {
  ingredients: [],
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
});
