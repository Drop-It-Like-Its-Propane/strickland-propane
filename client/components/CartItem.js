import React from "react";
import { connect } from "react-redux";
import { editQuantity } from "../store/cart";

export class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.insertDecimal = this.insertDecimal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this)
  }

  insertDecimal(num) {
    return (num / 100).toFixed(2);
  }

  handleClick(event){
    console.log('hello', this.props)
  event.preventDefault()
  }

  handleSubmit(event) {
    event.preventDefault();
    const editValues = {
      orderId: this.props.item.orderId,
      productId: event.target.productId.value,
      quantity: event.target.quantity.value,
    };
    this.props.editQuantity(this.props.userId, editValues);
  }

  render() {
    const { item } = this.props || [];
    const {product} = this.props.item|| []
    return (
      <div>
        <button onClick={this.handleClick}> x </button>
        <div>{product.name}</div>
        <img src={item.imageUrl} />
        <div> {product.description} </div>
        <div>${this.insertDecimal(product.price)}</div>
        <form htmlFor="quantity" onSubmit={this.handleSubmit}>
          <label htmlFor="quantity">Quantity:</label>
          <select name="quantity" id="quantity">
            <option value={item.quantity} defaultValue hidden>
              {" "}
              {item.quantity}{" "}
            </option>
            {[...Array(10).keys()].map((number) => (
              <option key={number} value={number}>
                {" "}
                {number}{" "}
              </option>
            ))}
          </select>
          <input
            type="hidden"
            id="productId"
            name="productId"
            value={item.product.id}
          ></input>
          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    editQuantity: (id, orderDetails) => dispatch(editQuantity(id, orderDetails)),
  };
};

export default connect(null, mapDispatch)(CartItem);
