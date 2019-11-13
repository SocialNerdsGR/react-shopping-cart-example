import React, { useState } from 'react';
import PriceSum from "./price-sum";

const CheckoutForm = ({items}) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      alert(JSON.stringify({
        name,
        email,
        address
      }));
      setName('');
      setEmail('');
      setAddress('');
    }}>
      <ul>
        {items.map((item) => (<li key={item.id}>{item.name} x {item.quantity} = {item.quantity * item.price}</li>))}
      </ul>
      <PriceSum cartItems={items}/>
      <div>
        Name:
        <input type="text" required value={name} onChange={(e) => {setName(e.target.value)}}/>
      </div>
      <div>
        Email:
        <input type="email" required value={email} onChange={(e) => {setEmail(e.target.value)}}/>
      </div>
      <div>
        Address:
        <input type="text" required value={address} onChange={(e) => {setAddress(e.target.value)}}/>

      </div>
      <div>
        <input type="submit" value="Pay" />
      </div>
    </form>
  );
};

export default CheckoutForm;