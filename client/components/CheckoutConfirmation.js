import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

// class OrderConfirmation extends React.Component({
//   componentDidMount() {
//     this.props.getCart();
// })

const OrderConfirmation = () => {
  return (
    <div>
      <h2> Order Placed! Thanks!</h2>
      <Link to={`/products/`} replace>Continue Shopping</Link>
    </div>
  )
}

export default OrderConfirmation

