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
    return checkResponse(response);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const {refreshToken, accessToken} = refreshTokenApi();
      saveTokens(refreshToken, accessToken);
      options.headers.authorization = accessToken;
      const response = await fetch(url, options);
      return checkResponse(response);
    } else {
      return Promise.reject(err);
    }
  }
}

// Запросить ингредиенты:
export async function getIngredients() {
  const response = await fetch(BASE_URL + '/ingredients');
  return checkResponse(response);
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
  return checkResponse(response);
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
  return checkResponse(response);
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
  return checkResponse(response);
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
  return checkResponse(response);
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
  return checkResponse(response);
}

// Выход из системы:
export async function logout() {
  const response = await fetch(BASE_URL + '/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({token: localStorage.getItem('refreshToken')}),
  });
  return checkResponse(response);
}

// Обновление токена:
export async function refreshTokenApi() {
  const response = await fetch(BASE_URL + '/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({token: localStorage.getItem('refreshToken')}),
  });
  return checkResponse(response);
}

// Получение данных о пользователе:
export async function getUserApi() {
  const response = await fetchWithRefresh(BASE_URL + '/auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie('accessToken'),
    },
  });
  return checkResponse(response);
}

// Редактирование данных пользователя:
export async function updateUserApi(name, email, password) {
  const response = await fetchWithRefresh(BASE_URL + '/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie('accessToken'),
    },
    body: JSON.stringify({name, email, password}),
  });
  return checkResponse(response);
}
