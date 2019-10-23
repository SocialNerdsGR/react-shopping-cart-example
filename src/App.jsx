import React from "react";
import {getProducts} from "./api";
import Cart from "./components/cart";
import Products from "./components/products";

import "./App.css";

class App extends React.Component {

  state = {
    needle: '',
    count: 0,
    page: 1,
    products: [],
    cartItems: []
  };

  async componentDidMount() {
     await this.fetchProducts();
  }

  fetchProducts = async () => {
    const {page, products} = this.state;

    const response = await getProducts(page);
    const loadedProducts = [...products, ...response.data];
    this.setState({
      products: loadedProducts,
      count: response.headers["x-total-count"] - loadedProducts.length,
      page: page + 1
    });
  };

  searchHandler = (event) => {
    this.setState({needle: event.target.value})
  };

  addToCart = (product) => {
    const {cartItems} = this.state;
    const item = cartItems.find(item => item.id === product.id);
    if (item) {
      return this.increaseHandler(item);
    }

    this.setState({cartItems: [...cartItems, {...product, quantity: 1}]})
  };

  increaseHandler = (product) => {
    const {cartItems} = this.state;

    const items = cartItems.map(item => {
      if (item.id === product.id) {
        return {...item, quantity: item.quantity + 1};
      }

      return item;
    });

    this.setState({cartItems: [...items]});
  };

  removeHandler = (id) => {
    const {cartItems} = this.state;
    const items = cartItems.filter(item => item.id !== id);
    this.setState({cartItems: items});
  };

  decreaseHandler = (product) => {
    if (product.quantity === 1) {
      return this.removeHandler(product.id);
    }
    const { cartItems } = this.state;

    const items = cartItems.map(item => {
      if (item.id === product.id) {
        return {...item, quantity: item.quantity - 1};
      }
      return item;
    });

    this.setState({cartItems: [...items]});
  };

  render() {
    const {needle, count, cartItems, products} = this.state;
    const regex = new RegExp(needle, "i");

    return (
      <div className="app">
        <h1>SocialNerds</h1>
        <input
          className={`search`}
          type="text"
          placeholder={`Search...`}
          value={needle}
          onChange={this.searchHandler}
        />
        <div className={`main`}>
          <Products
            count={count}
            filteredProducts={products.filter(product => product.name.match(regex) )}
            fetchProducts={this.fetchProducts}
            addToCart={this.addToCart}
          />
          <Cart
            removeHandler={this.removeHandler}
            increaseHandler={this.increaseHandler}
            decreaseHandler={this.decreaseHandler}
            cartItems={cartItems}
          />
        </div>
      </div>
    );
  }
}

export default App;
