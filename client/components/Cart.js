//Placeholder cart component for testing

import React from "react";
import { connect } from "react-redux";
import { fetchCart, checkout, editQuantity } from "../store/cart";

class Cart extends React.Component {
  constructor() {
  super()
  this.insertDecimal = this.insertDecimal.bind(this);
  this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.getCart(this.props.match.params.id);
  }
  insertDecimal(num) {
    return (num / 100).toFixed(2);
  }
  handleClick(event) {
    event.preventDefault();
    this.props.checkout(this.props.match.params.id)}

  handleSubmit(event){
    event.preventDefault();
  }



  render() {
    const userOrderDetails = this.props.cart.orderDetails || []
    return (
      <div className="container">
        <h2> User Cart </h2>
         {userOrderDetails.map((item) => {
          return (
            <div key = {item.id} className = "singleContainer">
              <div> {item.product.name} </div>
              <img src = {item.imageUrl} />
              <div> {item.product.description} </div>
              <label for="quantity">Quantity:</label>
              <select name = "quantity">
              <option value={item.quantity} defaultValue hidden> {item.quantity} </option>
              {[...Array(10).keys()].map((number)=>(
                <option key={number} value = {number}> {number} </option>
              ))}
              </select>
              <div> Price: {this.insertDecimal(item.totalPrice)} </div>
              {/* <div> Quantity: {item.quantity} </div> */}
            </div>
         )})}
        <button onClick={this.handleClick}>Checkout</button>
      </div>
    )
      }
    }


const mapState = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatch = (dispatch, {history}) => {
  return {
    getCart: (id) => dispatch(fetchCart(id)),
    checkout: (id) => dispatch(checkout(id, history)),
    editQuantity: (orderDetails) => dispatch(editQuantity(orderDetails))
  };
};
export default connect(mapState, mapDispatch)(Cart);
