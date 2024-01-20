/* eslint-disable react/prop-types */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createOrder, updateOrder, getOrderTypes } from '../../utils/data/OrderData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
  customerPhone: '',
  customerEmail: '',
  orderType: '',
  isClosed: false,
};

function OrderForm({ obj }) {
  const [currentOrder, setCurrentOrder] = useState([]);
  const [orderTypes, setOrderTypes] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getOrderTypes().then((types) => {
      console.warn('OrderTypes:', types);
      setOrderTypes(types);
    });
    if (obj && obj.id) {
      setCurrentOrder((prevState) => ({
        ...prevState,
        id: obj.id,
        name: obj.name,
        customerPhone: obj.customer_phone,
        customerEmail: obj.customer_email,
        orderType: obj.order_type?.id,
        user: user.uid,
      }));
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCurrentOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const orderUpdate = {
        id: obj.id,
        name: currentOrder.name,
        customer_phone: currentOrder.customerPhone,
        customer_email: currentOrder.customerEmail,
        orderType: currentOrder.orderType,
        user: user.uid,
      };
      updateOrder(orderUpdate).then(() => router.push('/orders'));
    } else {
      const order = {
        name: currentOrder.name,
        customer_phone: currentOrder.customerPhone,
        customer_email: currentOrder.customerEmail,
        orderType: currentOrder.orderType,
        user: user.uid,
      };
      createOrder(order).then(() => router.push('/orders'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-grey mt-5">{obj.id ? 'Update' : 'Create'}Order</h2>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" required value={currentOrder.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Customer Phone</Form.Label>
          <Form.Control
            name="customerPhone"
            type="customerPhone"
            required
            value={currentOrder.customerPhone}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Customer Email</Form.Label>
          <Form.Control
            name="customerEmail"
            type="customerEmail"
            required
            value={currentOrder.customerEmail}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Order Type</Form.Label>
          <Form.Select
            name="orderType"
            required
            value={currentOrder.orderType}
            onChange={handleChange}
          >
            <option value="">Select Order Type</option>
            {orderTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Order
        </Button>
      </Form>
    </>
  );
}

OrderForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    customerPhone: PropTypes.string,
    customerEmail: PropTypes.string,
    orderType: PropTypes.number,
  }),
};

OrderForm.defaultProps = {
  obj: initialState,
};

export default OrderForm;
