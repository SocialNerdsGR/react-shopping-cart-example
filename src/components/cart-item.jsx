import React from 'react';

const CartItem = ({quantity, name, increaseHandler, decreaseHandler, removeHandler}) => (
  <li>
    <span>{quantity}-</span>
    <span>{name}</span>
    <button onClick={increaseHandler}>+</button>
    <button onClick={decreaseHandler}>-</button>
    <button className={`remove`} onClick={removeHandler}>x</button>
  </li>
);

export default CartItem;
