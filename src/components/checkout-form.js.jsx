import React from 'react';
import PriceSum from "./price-sum";

class CheckoutForm extends React.Component {
  state = {
    name: '',
    email: '',
    address: ''
  };

  fieldsHandler = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  formHandler = (event) => {
    event.preventDefault();
    const {
      name,
      email,
      address
    } = this.state;

    alert(JSON.stringify({
      name,
      email,
      address
    }))
  };

  render() {
    const {items} = this.props;
    const {
      name,
      email,
      address
    } = this.state;

    return (
      <form onSubmit={this.formHandler}>
        <ul>
          {items.map((item) => (<li key={item.id}>{item.name} x {item.quantity} = {item.quantity * item.price}</li>))}
        </ul>
        <PriceSum cartItems={items}/>
        <div>
          Name:
          <input type="text" required value={name} onChange={this.fieldsHandler}/>
        </div>
        <div>
          Email:
          <input type="email" required value={email} onChange={this.fieldsHandler}/>
        </div>
        <div>
          Address:
          <input type="text" required value={address} onChange={this.fieldsHandler}/>
        </div>
        <div>
          <input type="submit" value="Pay"/>
        </div>
      </form>
    );

  }
}

export default CheckoutForm;
