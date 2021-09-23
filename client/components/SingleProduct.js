// REACT Single Product Component
import React from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store/singleProduct";

class SingleProduct extends React.Component {
  constructor() {
    super();
    //eventually add a buy button
  }
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id, { history });
    console.log(this);
  }
  render() {
    const product = this.props.product;
    return (
      <div>
        <h2> {product.name} </h2>
        <img src={product.imageUrl} />
        <div>{product.price}</div>
        <p>{product.description}</p>
        <button>Add to Cart</button>
      </div>
    );
  }
}

const mapState = (state) => {
  return { product: state.product };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    getProduct: (id) => dispatch(fetchProduct(id, history)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
