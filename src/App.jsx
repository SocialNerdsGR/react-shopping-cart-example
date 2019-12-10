import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Cart from "./components/cart";
import Products from "./components/products";

import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const regex = new RegExp(query, "i");
    return products.filter(product => product.name.match(regex));
  }, [query, products]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://shopping-cart-json-server.herokuapp.com/products');
      setProducts(response.data);
    }
    fetchProducts();
  }, []);

  function addToCart(product) {
    const item = cartItems.find(item => item.id === product.id);
    if (item) {
      return increaseHandler(item);
    }

    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  }

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

  function increaseHandler(product) {
    const items = cartItems.map(item => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }

      return item;
    });

    setCartItems([...items]);
  }

  function removeHandler(id) {
    const items = cartItems.filter(item => item.id !== id);
    setCartItems(items);
  }

  function searchHandler(event) {
    setQuery(event.target.value);
  }

  return (
    <div className="app">
      <h1>SocialNerds</h1>
      <input
        className={`search`}
        type="text"
        placeholder={`Search...`}
        value={query}
        onChange={searchHandler}
      />
      <div className={`main`}>
        <Products
          filteredProducts={filteredProducts}
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
