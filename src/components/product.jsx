import React from 'react';

const Product = ({name, price, available, addHandler}) => (
  <div className="product">
    <h3>{name}</h3>
    <span>{price}</span>
    <button onClick={addHandler} disabled={!available}>Add to cart</button>
  </div>
);

export default Product;
