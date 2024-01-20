import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import OrderCard from '../../components/orders/OrderCard';
import { getAllOrders } from '../../utils/data/OrderData';

export default function Home() {
  const [orders, setOrders] = useState([]);

  const getAllTheOrders = () => {
    getAllOrders().then(setOrders);
  };

  useEffect(() => {
    getAllTheOrders();
  }, []);

  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      <div className="center-container">
        <Link href="orders/new" passHref>
          <Button style={{ backgroundColor: '#023e8a', marginBottom: '30px', marginTop: '20px' }}>Create Order</Button>
        </Link>
      </div>
      <div className="home-orders">
        <div
          id="homepage-order-cards"
          className="d-flex flex-wrap"
        >
          {orders.map((order) => (
            <div className="order-container" key={order.id}>
              <OrderCard orderObj={order} onUpdate={getAllTheOrders} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
