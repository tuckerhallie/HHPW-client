/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

function OrderCard({ orderObj }) {
  const router = useRouter();
  return (
    <Card
      className="order-card"
      style={{
        width: '18rem', margin: '20px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', borderRadius: '10px',
      }}
    >

      <Card.Body className="order-content" style={{ height: '200px' }}>
        <h5>{orderObj.name}</h5>
        <h3>{orderObj.customer_phone}</h3>
        <h2>{orderObj.customer_email}</h2>
        <h1>{orderObj.orderType}</h1>
        <h1>{String(orderObj.is_closed ? 'Closed' : 'Open')}</h1>
      </Card.Body>

      <Button onClick={() => {
        router.push(`/orders/edit/${orderObj.id}`);
      }}
      >Update Order
      </Button>
      <Button onClick={() => {
        router.push(`orders/${orderObj.id}`);
      }}
      >View Order Details</Button>

    </Card>
  );
}

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    name: PropTypes.string,
    customer_phone: PropTypes.string,
    customer_email: PropTypes.string,
    id: PropTypes.number,
    orderType: PropTypes.object,
    is_closed: PropTypes.bool,
  }).isRequired,
};

export default OrderCard;
