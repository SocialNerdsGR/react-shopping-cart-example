import React, {useState, useEffect, useMemo} from 'react';
import {getProducts} from './api';
import './App.css';
import Product from "./components/product";
import CartItem from "./components/cart-item";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [needle, setNeedle] = useState('');
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  /**
   * Computed products filtered by user input.
   */
  const filteredProducts = useMemo(() => {
    const regex = new RegExp(needle, 'i');
    return products.filter(product => product.name.match(regex));
  }, [needle, products]);

  async function fetchProducts() {
    const response = await getProducts(page);
    const loadedProducts = [...products, ...response.data]
    setProducts(loadedProducts);
    setCount(response.headers['x-total-count'] - loadedProducts.length);
    setPage(page + 1)
  }

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
    if (!item) {
      setCartItems([...cartItems, {...product, quantity: 1}])
    }
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
        return {...item, quantity: item.quantity - 1};
      }
      return item;
    });

    setCartItems([...items])
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
        return {...item, quantity: item.quantity + 1};
      }

      return item;
    });

    setCartItems([...items])
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
      <h1>SocialNerds SWAG</h1>
      <input className={`search`} type="text" placeholder={`Search...`} value={needle} onChange={searchHandler}/>
      <div className={`main`}>
        <div className="products">
          {filteredProducts.map(product => (<Product key={product.id} {...product} addHandler={() => addToCart(product)}/>))}
          {count !== 0 ? <button onClick={fetchProducts}>Load more</button> : null}
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
