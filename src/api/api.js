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
