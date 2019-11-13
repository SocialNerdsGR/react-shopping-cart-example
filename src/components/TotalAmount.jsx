import React from "react";

const TotalAmount = ({cartItems}) => (
  <div>
    <span>Sum:</span>
    <span>
      {cartItems.reduce(
        (sum, {price, quantity}) => price * quantity + sum,
        0
      )}
    </span>
  </div>
);

export default TotalAmount;
