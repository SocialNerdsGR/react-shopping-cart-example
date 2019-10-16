import React from 'react';

const Product = ({name, price, available, addHandler}) => (
  <div className="product">
    <h4>{name} - {price}</h4>
    <button onClick={addHandler} disabled={!available}>Add to cart</button>
  </div>
);

export default Product;
