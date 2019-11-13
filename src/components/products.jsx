import React from 'react';
import Product from "./product";

const Products = ({filteredProducts, addToCart, fetchProducts, count}) => {
  return (
    <div className="products">
      {filteredProducts.map(product => (
        <Product
          key={product.id}
          {...product}
          addHandler={() => addToCart(product)}
        />
      ))}
    </div>
  );
};

export default Products;
