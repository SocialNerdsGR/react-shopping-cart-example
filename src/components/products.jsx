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
      {count !== 0 ? (
        <button onClick={fetchProducts}>Load more</button>
      ) : null}
    </div>
  );
};

export default Products;
