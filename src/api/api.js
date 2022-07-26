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
  console.debug(email)
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
