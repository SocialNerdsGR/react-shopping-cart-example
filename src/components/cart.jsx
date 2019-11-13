import React, {useState} from 'react';
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";
import TotalAmount from "./TotalAmount";

const Cart = ({cartItems, decreaseHandler, increaseHandler, removeHandler}) => {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <div className="cart">
      <h3>Cart</h3>
      {!showCheckout ?
        <div>
          <ul>
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                quantity={item.quantity}
                name={item.name}
                decreaseHandler={() => decreaseHandler(item)}
                increaseHandler={() => increaseHandler(item)}
                removeHandler={() => removeHandler(item.id)}
              />
            ))}
            <TotalAmount cartItems={cartItems}/>
            <button disabled={cartItems.length === 0} onClick={() => setShowCheckout(true)}>Checkout</button>
          </ul>
        </div>
        : <CheckoutForm items={cartItems}/>
      }
    </div>
  );
};

export default Cart;
