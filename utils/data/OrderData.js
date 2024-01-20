import { clientCredentials } from '../client';

const getAllOrders = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createOrder = (order) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateOrder = (payload, uid) => new Promise((resolve, reject) => {
  const updatedPayload = {
    ...payload,
    user: payload.user || uid,
  };

  fetch(`${clientCredentials.databaseURL}/orders/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
    body: JSON.stringify(updatedPayload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        return null;
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network Response Error');
      }
      resolve();
    })
    .catch(reject);
});

const getOrderTypes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/ordertypes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// eslint-disable-next-line consistent-return
const addOrderItems = async (orderId, itemId) => {
  try {
    const response = await fetch('http://localhost:8000/orderitems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id: orderId,
        item_id: itemId,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding item to order:', error);
  }
};

const deleteOrderItem = async (orderId) => {
  try {
    const response = await fetch(`${clientCredentials.databaseURL}/orderitems/${orderId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    if (response.status === 204) {
      return;
    }
    // eslint-disable-next-line consistent-return
    return response.json();
  } catch (error) {
    console.error('Error deleting order item:', error);
    throw error;
  }
};

const getItemsForOrder = (orderId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orderitems/${orderId}/items_for_order`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then(resolve)
    .catch(reject);
});

export {
  getAllOrders, createOrder, updateOrder, getSingleOrder, getOrderTypes, addOrderItems, deleteOrderItem, getItemsForOrder, deleteOrder,
};
