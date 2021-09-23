import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/allProducts";
import Products from "./Products";

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    return (
      <div className="container">
        {this.props.products.map((product) => {
          return (
            <div key={product.id}>
              <Products products={product} />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.allProducts,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
  };
};
export default connect(mapState, mapDispatch)(AllProducts);
