import React from "react";
import { connect } from "react-redux";

class AllProducts extends React.Component {
  render() {
    return <div>hi</div>;
  }
}

mapstate = (state) => {
  return {
    products: state.products,
  };
};
export default connect(mapState)(AllProducts);
