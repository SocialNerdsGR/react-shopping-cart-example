import React, { useState, useEffect, useMemo } from "react";
import { getProducts } from "./api";
import Cart from "./components/cart";
import Products from "./components/products";

import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [needle, setNeedle] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  /**
   * Computed products filtered by user input.
   */
  const filteredProducts = useMemo(() => {
    const regex = new RegExp(needle, "i");
    return products.filter(product => product.name.match(regex));
  }, [needle, products]);

  /**
   * Fetch products from server.
   *
   * @returns {Promise<void>}
   */
  const fetchProducts = async () => {
    const response = await getProducts(page);
    const loadedProducts = [...products, ...response.data];
    setProducts(loadedProducts);
    setCount(response.headers["x-total-count"] - loadedProducts.length);
    setPage(page + 1);
  };

  /**
   * Load products.
   */
  useEffect(() => {
    fetchProducts();
  }, []);

  /**
   * Add product to cart.
   *
   * @param {object} product
   *  Product object.
   */
  function addToCart(product) {
    const item = cartItems.find(item => item.id === product.id);
    if (item) {
      return increaseHandler(item);
    }

    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  }

  /**
   * Decrease product quantity.
   *
   * @param {object} product
   *  Cart product object.
   */
  function decreaseHandler(product) {
    if (product.quantity === 1) {
      return removeHandler(product.id);
    }

    const items = cartItems.map(item => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    setCartItems([...items]);
  }

  /**
   * Increase product quantity.
   *
   * @param {object} product
   *  Cart product object.
   */
  function increaseHandler(product) {
    const items = cartItems.map(item => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }

      return item;
    });

    setCartItems([...items]);
  }

  /**
   * Remove product from cart.
   *
   * @param {number} id
   *  Product id.
   *
   */
  function removeHandler(id) {
    const items = cartItems.filter(item => item.id !== id);
    setCartItems(items);
  }

  /**
   * Update search needle.
   *
   * @param event
   *  Input changed event.
   */
  function searchHandler(event) {
    setNeedle(event.target.value);
  }

  return (
    <div className="app">
      <h1>SocialNerds</h1>
      <input
        className={`search`}
        type="text"
        placeholder={`Search...`}
        value={needle}
        onChange={searchHandler}
      />
      <div className={`main`}>
        <Products
          count={count}
          filteredProducts={filteredProducts}
          fetchProducts={fetchProducts}
          addToCart={addToCart}
        />
        <Cart
          removeHandler={removeHandler}
          increaseHandler={increaseHandler}
          decreaseHandler={decreaseHandler}
          cartItems={cartItems}
        />
      </div>
    </div>
  );
}

export default App;
