import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  SWAP_INGREDIENTS
} from '../constants/ingredient';
import {ingredientReducer} from './ingredient';


const initialState = {
  ingredients: [], ingredientsRequest: false, ingredientsFailed: false,

  constructorItems: [],
}

const testIngredientsItems = [{
  _id: '60d3b41abdacab0026a733c6',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
}, {
  _id: '60d3b41abdacab0026a733c8',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0
}]
const testConstructorItems = [{
  _id: '60d3b41abdacab0026a733c7',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
  __v: 0,
  id: '9f8aee4e-79ba-4776-80b5-f220a69a745b'
}, {
  _id: '60d3b41abdacab0026a733cc',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0,
  id: '5374d105-dbd2-439a-86c8-b9690705ce87'
}]

const testConstructorItemsSwapped = [{
  _id: '60d3b41abdacab0026a733cc',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0,
  id: '5374d105-dbd2-439a-86c8-b9690705ce87'
}, {
  _id: '60d3b41abdacab0026a733c7',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
  __v: 0,
  id: '9f8aee4e-79ba-4776-80b5-f220a69a745b'
}]

describe('Проверка редьюсера wsReducer', () => {
  it('Проверка начального состояния', () => {
    expect(ingredientReducer(undefined, {})).toEqual(initialState);
  })
  it('Проверка редьюсера. ADD_INGREDIENT', () => {
    expect(ingredientReducer({...initialState, ingredients: testIngredientsItems}, {
      type: ADD_INGREDIENT, payload: {uuid: 'testId32423a', id: testIngredientsItems[1]._id}
    })).toEqual(expect.objectContaining({
      constructorItems: expect.arrayContaining([{
        ...testIngredientsItems[1], id: 'testId32423a'
      }])
    }))
  })
  it('Проверка редьюсера. ADD_INGREDIENT (BROKEN)', () => {
    expect(ingredientReducer({...initialState, ingredients: testIngredientsItems}, {
      type: ADD_INGREDIENT, payload: {uuid: 'testId32423a', id: 234423}
    })).toEqual({...initialState, ingredients: testIngredientsItems});
  })
  it('Проверка редьюсера. ADD_INGREDIENT (BUN)', () => {
    expect(ingredientReducer({...initialState, ingredients: testIngredientsItems}, {
      type: ADD_INGREDIENT, payload: {uuid: 'testId32423a', id: testIngredientsItems[0]._id}
    })).toEqual(expect.objectContaining({
      constructorItems: expect.arrayContaining([{
        ...testIngredientsItems[0], id: 'testId32423a'
      }, {
        ...testIngredientsItems[0], id: 'testId32423a'
      }])
    }))
  })
  it('Проверка редьюсера. DELETE_INGREDIENT', () => {
    expect(ingredientReducer({...initialState, constructorItems: testConstructorItems}, {
      type: DELETE_INGREDIENT, id: testConstructorItems[1].id,
    })).toEqual(expect.objectContaining({
      constructorItems: expect.not.arrayContaining([testConstructorItems[1]])
    }));
  })
  it('Проверка редьюсера. DELETE_BROKEN_INGREDIENT', () => {
    expect(ingredientReducer({...initialState, constructorItems: testConstructorItems}, {
      type: DELETE_INGREDIENT, id: 6745,
    })).toEqual({...initialState, constructorItems: testConstructorItems});
  })
  it('Проверка редьюсера. GET_INGREDIENTS_FAILED', () => {
    expect(ingredientReducer(initialState, {type: GET_INGREDIENTS_FAILED})).toEqual({
      ...initialState, ingredientsRequest: false, ingredientsFailed: true,
    });
  })
  it('Проверка редьюсера. GET_INGREDIENTS_REQUEST', () => {
    expect(ingredientReducer({
      ...initialState, ingredientsRequest: false
    }, {type: GET_INGREDIENTS_REQUEST})).toEqual({
      ...initialState, ingredients: initialState.ingredients, ingredientsRequest: true
    });
  })
  it('Проверка редьюсера. GET_INGREDIENTS_SUCCESS', () => {
    expect(ingredientReducer(initialState, {
      type: GET_INGREDIENTS_SUCCESS, ingredients: testConstructorItems
    })).toEqual({
      ...initialState, ingredients: testConstructorItems, ingredientsRequest: false, ingredientsFailed: false,
    });
  })
  it('Проверка редьюсера. SWAP_INGREDIENTS', () => {
    expect(ingredientReducer({...initialState, constructorItems: testConstructorItems}, {
      type: SWAP_INGREDIENTS, payload: {oldId: testConstructorItems[0].id, newId: testConstructorItems[1].id}
    })).toEqual({
      ...initialState, constructorItems: testConstructorItemsSwapped,
    });
  })
});
