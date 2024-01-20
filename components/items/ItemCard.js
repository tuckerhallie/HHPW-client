/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';

function ItemCard({
  item, showRemoveButton, showAddButton, onAddToOrder, onDeleteFromOrder,
}) {
  const handleAddToOrder = (itemId) => {
    onAddToOrder(itemId);
  };
  const handleDeleteFromOrder = () => {
    onDeleteFromOrder(item.id);
  };

  return (
    <>
      <Card className="text-center">
        <Card.Header>{item.name}</Card.Header>
        <Card.Body>
          <Card.Title>${item.price}</Card.Title>
        </Card.Body>
        {showRemoveButton && (
          <Button onClick={handleDeleteFromOrder} className="item-delete-btn">
            X
          </Button>
        )}
        {showAddButton && (
          <Button onClick={handleAddToOrder} className="item-add-btn">
            +
          </Button>
        )}
      </Card>
    </>
  );
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  onAddToOrder: PropTypes.func,
  onDeleteFromOrder: PropTypes.func,
  showAddButton: PropTypes.bool,
  showRemoveButton: PropTypes.bool,
};

export default ItemCard;
