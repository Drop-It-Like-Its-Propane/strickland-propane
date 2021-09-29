//Placeholder cart component for testing

import React from "react";
import { connect } from "react-redux";
import { fetchCart, checkout } from "../store/cart";
import CartItem from "./CartItem";

class Cart extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.getCart(this.props.match.params.id);
  }
  handleClick(event) {
    event.preventDefault();
    this.props.checkout(this.props.match.params.id)}

  render() {
    const userOrderDetails = this.props.cart.orderDetails || [];
    return (
      <div className="container">
        <h2> User Cart </h2>
        {userOrderDetails.map((item) => {
          return (
            <div key={item.id} className="singleContainer">
              <button
                onClick={() =>
                  this.props.deleteButton(this.props.userId, {
                    orderId: this.props.cart.orderId,
                    productId: item.productId,
                  })
                }
              >
                X
              </button>
              <CartItem userId={this.props.cart.userId} item={item} />
            </div>
          );
        })}

        <div>Total Price: *Pending </div>
        <button onClick={this.handleClick}>Checkout</button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCart: (id) => dispatch(fetchCart(id)),
    checkout: (id) => dispatch(checkout(id, history))
  };
};

export default connect(mapState, mapDispatch)(Cart);
