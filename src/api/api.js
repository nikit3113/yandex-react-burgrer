import {getCookie, setCookie} from "../utils/cookie";

const BASE_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const saveTokens = (refreshToken, accessToken) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

const fetchWithRefresh = async (url, options) => {
  try {
    const response = await fetch(url, options);
    return await checkResponse(response);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const {refreshToken, accessToken} = await refreshTokenApi();
      saveTokens(refreshToken, accessToken);
      options.headers.authorization = accessToken;
      const response = await fetch(url, options);
      return await checkResponse(response);
    } else {
      return Promise.reject(err);
    }
  }
}

// Запросить ингредиенты:
export async function getIngredients() {
  const response = await fetch(BASE_URL + '/ingredients');
  return await checkResponse(response);
}

// Сделать заказ:
export async function postOrder(data = {}) {
  const response = await fetch(BASE_URL + '/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  return await checkResponse(response);
}

// Сброс пароля:
export async function passwordForgot(email) {
  const response = await fetch(BASE_URL + '/password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email}),
  });
  return await checkResponse(response);
}

// Сброс пароля:
export async function passwordReset(password, token) {
  const response = await fetch(BASE_URL + '/password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, token}),
  });
  return await checkResponse(response);
}

// Регистрация:
export async function register(email, password, name) {
  const response = await fetch(BASE_URL + '/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password, name}),
  });
  return await checkResponse(response);
}

// Авторизация:
export async function login(email, password) {
  const response = await fetch(BASE_URL + '/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password}),
  });
  return await checkResponse(response);
}

// Выход из системы:
export async function logoutApi() {
  const response = await fetch(BASE_URL + '/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({token: localStorage.getItem('refreshToken')}),
  });
  return await checkResponse(response);
}

// Обновление токена:
export async function refreshTokenApi() {
  const response = await fetch(BASE_URL + '/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({token: localStorage.getItem('refreshToken')}),
  });
  return await checkResponse(response);
}


/*
 * Приватные запросы
 */
// Получение данных о пользователе:
export async function getUserApi() {
  return await fetchWithRefresh(BASE_URL + '/auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie('accessToken'),
    },
  });
}

// Редактирование данных пользователя:
export async function updateUserApi(name, email, password) {
  return await fetchWithRefresh(BASE_URL + '/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie('accessToken'),
    },
    body: JSON.stringify({name, email, password}),
  });
}
