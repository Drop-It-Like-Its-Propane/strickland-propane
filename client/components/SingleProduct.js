// REACT Single Product Component
import React from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store/singleProduct";
import { addItem, fetchCart, createCart } from "../store/cart";
import {me} from '../store/auth'


class SingleProduct extends React.Component {
  constructor() {
    super();
    this.insertDecimal = this.insertDecimal.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id, { history });
    this.props.getUser()
  }
  
  componentDidUpdate(prevProps){
    if (prevProps.user != this.props.user)
    this.props.getCart(this.props.user)
  }

  insertDecimal(num) {
    return (num / 100).toFixed(2);
  }

  handleClick(event) {
    event.preventDefault();
    if(!this.props.cart.id) {
      this.props.createCart(this.props.user, this.props.product)
    } else {
    let mergedDetails = {
      ...this.props.product,
      cartId: (this.props.cart.orderId? this.props.cart.orderId: this.props.cart.id)
    }
    this.props.addItem(this.props.user, mergedDetails)}
  }

  render() {
    const { product } = this.props;
    return (
      <div>
        <h2> {product.name} </h2>
        <img src={product.imageUrl} />
        <div>{this.insertDecimal(product.price)}</div>
        <p>{product.description}</p>
        <button onClick={this.handleClick}>Add to Cart</button>
      </div>
    );
  }
}

const mapState = (state) => {
  return { product: state.product,
  user: state.auth.id,
  cart: state.cart };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    getProduct: (id) => dispatch(fetchProduct(id, history)),
    createCart: (id, product) => dispatch(createCart(id, product)),
    getCart: (id) => dispatch(fetchCart(id)),
    addItem: (id, product) => dispatch(addItem(id, product)),
    getUser: () => dispatch(me())
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
