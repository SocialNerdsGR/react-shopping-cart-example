import React, {useState, useEffect} from 'react';
import {getProducts} from './api';
import './App.css';
import Product from "./components/product";
import CartItem from "./components/cart-item";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await getProducts();
      setProducts(response.data);
    }

    fetchProducts();
  }, []);

  function addToCart(product) {
    const item = cartItems.find(item => item.id === product.id);
    if (!item) {
      setCartItems([...cartItems, {...product, quantity: 1}])
    }
  }

  function decreaseHandler(product) {
    if (product.quantity === 1) {
      return removeHandler(product.id);
    }

    const items = cartItems.map(item => {
      if (item.id === product.id) {
        return {...item, quantity: item.quantity - 1};
      }
      return item;
    });

    setCartItems([...items])
  }

  function increaseHandler(product) {
    const items = cartItems.map(item => {
      if (item.id === product.id) {
        return {...item, quantity: item.quantity + 1};
      }

      return item;
    });

    setCartItems([...items])
  }

  function removeHandler(id) {
    const items = cartItems.filter(item => item.id !== id);
    setCartItems(items);
  }

  return (
    <div className="app">
      <h1>SocialNerds SWAG</h1>
      <input className={`search`} type="text" placeholder={`Search...`}/>
      <div className={`main`}>
        <div className="products">
          {products.map(product => (<Product key={product.id} {...product} addHandler={() => addToCart(product)}/>))}
        </div>
        <div className="card">
          <ul>
            {cartItems.map(item =>
              <CartItem
                key={item.id}
                quantity={item.quantity}
                name={item.name}
                decreaseHandler={() => decreaseHandler(item)}
                increaseHandler={() => increaseHandler(item)}
                removeHandler={() => removeHandler(item.id)}
              />)
            }
          </ul>
          <button>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default App;
