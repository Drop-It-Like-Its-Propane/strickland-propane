// REACT Single Product Component
import React from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store/singleProduct";
import { addItem, fetchCart, createCart } from "../store/cart";
import {me} from '../store/auth';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//add 'Toast Notification" for adding item to cart
//Add in STRIPE
//GuestCart/
//Order History

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.insertDecimal = this.insertDecimal.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.getUser()
    this.props.getProduct(this.props.match.params.id, { history });
  }

  componentDidUpdate(prevProps){
    if (!this.props.cart.orderId) {
    this.props.getCart(this.props.user)}
  }

  insertDecimal(num) {
    return (num / 100).toFixed(2);
  }

  handleClick(event) {
    event.preventDefault();
    console.log(this.props.cart)
    if(!this.props.cart.id) {
      this.props.createCart(this.props.user, this.props.product)
    } else {
    let mergedDetails = {
      ...this.props.product,
      cartId: (this.props.cart.orderId? this.props.cart.orderId: this.props.cart.id)
    }
    this.props.addItem(this.props.user, mergedDetails)}
  }

  notify(){
    return toast("Item added to cart!")}

  render() {
    const { product } = this.props;
    return (
      <div>
        <h2> {product.name} (0 items in cart)</h2>
        <img className="singleProductImg" src="../proPAIN.jpg" />
        <div>{this.insertDecimal(product.price)}</div>
        <p>{product.description}</p>
        <button onClick={this.handleClick, this.notify}>Add to Cart</button>
        <ToastContainer />
        <Link to="/products"> All Products </Link>
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
