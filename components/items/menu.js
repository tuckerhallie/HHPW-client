import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import ItemCard from './ItemCard';
import getAllMenuItems from '../../utils/data/MenuData';
import { addOrderItems } from '../../utils/data/OrderData';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const router = useRouter();
  const { orderId } = router.query;

  const returnToOrder = () => {
    router.push(`/orders/${orderId}`);
  };

  useEffect(() => {
    getAllMenuItems()
      .then((items) => {
        console.warn('Retrieved items:', items);
        setMenuItems(items);
      });
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Menu</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={returnToOrder} variant="primary" size="lg" style={{ marginBottom: '10px' }}>
          Return To Order
        </Button>
      </div>
      <div className="item-cards">
        {menuItems.map((item) => (
          <div className="item-container" key={item.id}>
            <ItemCard
              item={item}
              showAddButton
              onAddToOrder={() => addOrderItems(orderId, item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
