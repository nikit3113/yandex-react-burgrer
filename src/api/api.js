export const API_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';
const API_ORDERS = 'https://norma.nomoreparties.space/api/orders';

// Сделать заказ:
export async function postOrder(data = {}) {
  const dataJSON = JSON.stringify(data)
  console.log(dataJSON);
  const response = await fetch(API_ORDERS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: dataJSON,
  });
  return await response.json();
}