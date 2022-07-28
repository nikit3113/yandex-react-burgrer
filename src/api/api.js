import {getCookie} from "../utils/cookie";

const BASE_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

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
export async function refreshToken() {
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
export async function getUser() {
  const response = await fetch(BASE_URL + '/auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie('accessToken'),
    },
  });
  return checkResponse(response);
}

// Редактирование данных пользователя:
export async function updateUser() {
  const response = await fetch(BASE_URL + '/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie('accessToken'),
    },
  });
  return checkResponse(response);
}
