import React from "react";
import { connect } from "react-redux";
import { editQuantity, deleteItem } from "../store/cart";

export class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.insertDecimal = this.insertDecimal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  insertDecimal(num) {
    return (num / 100).toFixed(2);
  }

  //placeholder for Delete click
  handleClick(event) {
    event.preventDefault();
    console.log("props", this.props);
    this.props.deleteButton(this.props.userId, this.props.item.id, history);
  }

  handleSubmit(event) {
    event.preventDefault();
    const editValues = {
      orderId: this.props.item.orderId,
      productId: event.target.productId.value,
      quantity: event.target.quantity.value,
    };
    this.props.editQuantity(this.props.userId, editValues, history);
  }

  render() {
    const { item } = this.props;
    const { product } = this.props.item;
    if (!product) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
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
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    editQuantity: (id, orderDetails) =>
      dispatch(editQuantity(id, orderDetails, history)),
    deleteButton: (id, itemId) => dispatch(deleteItem(id, itemId, history)),
  };
};

export default connect(mapState, mapDispatch)(CartItem);
