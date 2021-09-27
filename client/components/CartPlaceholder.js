//Placeholder cart component for testing

import React from "react";
import { connect } from "react-redux";
import {fetchCart} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart(this.props.match.params.id);
  }
  render() {
    console.log(this.props.cart)
    return (
      <div className="container">
        Cart Placeholder
      </div>
        )}

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
