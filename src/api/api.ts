import {getCookie, setCookie} from "../utils/cookie";

const BASE_URL = 'https://norma.nomoreparties.space/api';

function request(url: RequestInfo, options: RequestInit | undefined) {
  return fetch(url, options).then(checkResponse)
}

const checkResponse = (res: Response): Promise<any> => {
  return res.ok ? res.json() : res.json().then((err: Promise<string>) => Promise.reject(err));
};

export const saveTokens = (refreshToken: string, accessToken: string) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

const fetchWithRefresh = async (url: string, options: RequestInit & {
  headers: { authorization: string }; //todo Fix this. Make this more pretty.
}) => {
  try {
    return request(url, options);
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      const {refreshToken, accessToken} = await refreshTokenApi();
      saveTokens(refreshToken, accessToken);
      options.headers.authorization = accessToken;
      return request(url, options);
    } else {
      return Promise.reject(err);
    }
  }
}

// Запросить ингредиенты:
export function getIngredients() {
  return request(BASE_URL + '/ingredients', undefined);
}

// Сброс пароля:
export function passwordForgot(email: string) {
  return request(BASE_URL + '/password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email}),
  });
}

// Сброс пароля:
export function passwordReset(password: string, token: string) {
  return request(BASE_URL + '/password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, token}),
  });
}

// Регистрация:
export function register(email: string, password: string, name: string) {
  return request(BASE_URL + '/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password, name}),
  });
}

// Авторизация:
export function login(email: string, password: string) {
  return request(BASE_URL + '/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password}),
  });
}

// Выход из системы:
export function logoutApi() {
  return request(BASE_URL + '/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({token: localStorage.getItem('refreshToken')}),
  });
}

// Обновление токена:
export function refreshTokenApi() {
  return request(BASE_URL + '/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({token: localStorage.getItem('refreshToken')}),
  });
}


/*
 * Приватные запросы
 */

// Получение данных о пользователе:
export function getUserApi() {
  return fetchWithRefresh(BASE_URL + '/auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie('accessToken'),
    },
  });
}

// Редактирование данных пользователя:
export function updateUserApi(name: string, email: string, password: string) {
  return fetchWithRefresh(BASE_URL + '/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie('accessToken'),
    },
    body: JSON.stringify({name, email, password}),
  });
}

// Сделать заказ:
export function postOrder(data = {}) {
  return request(BASE_URL + '/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie('accessToken'),
    },
    body: JSON.stringify(data),
  });
}