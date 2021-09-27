//Placeholder cart component for testing

import React from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";

class Cart extends React.Component {
  constructor() {
  super()
  this.insertDecimal = this.insertDecimal.bind(this);

}
  componentDidMount() {
    this.props.getCart(this.props.match.params.id);
  }

  insertDecimal(num) {
    return (num / 100).toFixed(2);
  }

  render() {

    const userOrderDetails = this.props.cart.orderDetails || []
    console.log(userOrderDetails)
    return (
      <div className="container">
        <h2> User Cart </h2>
         {userOrderDetails.map((item) => {
          return (
            <div key = {item.id} className = "singleContainer">
            <div> {item.product.name} </div>
            <img src = {item.imageUrl} />
            <div> {item.product.description} </div>
            <div> Quantity: {item.quantity} </div>
            <div> Price: {this.insertDecimal(item.totalPrice)} </div>
            </div>
          )
        })}
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
  };
};
export default connect(mapState, mapDispatch)(Cart);
