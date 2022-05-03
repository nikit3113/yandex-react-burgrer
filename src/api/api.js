const API_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';
const API_ORDERS = 'https://norma.nomoreparties.space/api/orders';

// Запросить ингредиенты:
export async function getIngredients() {
  const response = await fetch(API_INGREDIENTS);
  return await response.json();
}

// Сделать заказ:
export async function postOrder(data = {}) {
  const response = await fetch(API_ORDERS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}