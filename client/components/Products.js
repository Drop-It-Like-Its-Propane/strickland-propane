import React from "react";
import { Link } from "react-router-dom";

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.insertDecimal = this.insertDecimal.bind(this);
  }

  insertDecimal(num) {
    return (num / 100).toFixed(2);
  }

  render() {
    const { products } = this.props;
    return (
      <Link to={`/products/${products.id}`}>
        <div>
          <h3 className="title">{products.name}</h3>
          <img className="productpictures" src="proPAIN.jpg" />
          <p className="description">{products.description}</p>
          <p>{this.insertDecimal(products.price)}</p>
        </div>
      </Link>
    );
  }
}
