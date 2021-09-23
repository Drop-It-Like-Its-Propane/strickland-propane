// REACT Single Product Component
import React from 'react';
import {connect} from 'react-redux'
import {fetchStudent} from "../store/SingleStudent"
import {Link} from 'react-router=dom'
import { render } from 'enzyme';


class SingleProduct extends React.Component {
  constructor() {
    super ()
    //eventually add a buy button
  }


  componentDigMount() {
    this.props.getProduct(this.props.match.params.id, { history })
  }


  render() {
    return (
      <div>
        <h2> {this.props.product.name} </h2>
        <img src = {this.props.product.imageUrl}/>
        <div>{this.props.product.price}</div>
        <p>{this.props.product.description}</p>
        <button>Add to Cart</button>
      </div>
    )
  }
}
