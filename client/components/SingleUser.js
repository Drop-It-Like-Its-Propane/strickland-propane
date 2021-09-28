import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../store/auth";
// import { fetchProduct } from "../store/singleProduct";
// import { addItem } from "../store/cart";


export default class SingleUser extends React.Component {
  // constructor() {
  //   super()
  // }

  // componentDidMount() {
  //   this.props.getUser()
  // }

//   handleClick(event) {
//   }

  render() {
    return (
      <div style={{backgroundColor: "burlywood"}}>
        <h1> Hello User!</h1>
        <h4> Your info</h4>
        <img style={{height: '200px'}}src="https://i.imgur.com/q7bIrzb.jpg" />
        <p>Name: </p>
        <p>Email:</p>
        <p> Admin status: </p>
      </div>
      
    )
  }
}

// const mapState = state => {
//     return {
//     }
//   }
  
//   const mapDispatch = dispatch => {
//     return {
//       getUser: () => dispatch(fetchUser())
//     }
//   }

//  export default connect(mapState, mapDispatch)(SingleUser);
