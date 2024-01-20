/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import {
  getItemsForOrder, deleteOrderItem, deleteOrder,
} from '../../utils/data/OrderData';
import ItemCard from '../../components/items/ItemCard';

const ViewOrder = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const deleteThisOrder = () => {
    if (window.confirm('Delete This Order?')) {
      deleteOrder(id).then(() => {
        router.push('/orders');
      });
    }
  };

  useEffect(() => {
    if (id) {
      getItemsForOrder(id)
        .then((items) => {
          setOrderItems(items);
          const total = items.reduce((sum, item) => sum + parseFloat(item.item.price), 0);
          setOrderTotal(total);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching order items:', error);
          setError(error);
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    const total = orderItems.reduce((sum, item) => sum + parseFloat(item.item.price), 0);
    setOrderTotal(total);
  }, [orderItems]);

  const goToMenuPage = () => {
    console.warn('Order ID:', id);
    router.push(`/items/menu?orderId=${id}`);
  };

  const handleDeleteFromOrder = (itemId) => {
    deleteOrderItem(itemId)
      .then(() => {
        const updatedItems = orderItems.filter((item) => item.id !== itemId);
        setOrderItems(updatedItems);
      });
  };

  if (loading) {
    return <p>Loading order details...</p>;
  }
  if (error) {
    return <p>Error loading order details: {error.message}</p>;
  }

  return (
    <div className="mt-5 d-flex flex-wrap">
      <h2> Order Items: </h2>
      <div className="item-crd-container">
        {orderItems.map((orderItem) => (
          <ItemCard
            key={orderItem.id}
            item={orderItem.item}
            showAddButton={false}
            showRemoveButton
            onDeleteFromOrder={() => handleDeleteFromOrder(orderItem.id)}
          />
        ))}
      </div>

      Total: ${orderTotal.toFixed(2)}

      <Button variant="primary" onClick={goToMenuPage} className="m-2"> Add Items</Button>

      <Button variant="danger" onClick={deleteThisOrder} className="m-2"> Delete</Button>

    </div>
  );
};

export default ViewOrder;
