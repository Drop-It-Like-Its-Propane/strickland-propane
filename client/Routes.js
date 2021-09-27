import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import AllProducts from "./components/AllProducts";
import { Login } from "./components/AuthForm";
import { Signup } from "./components/SignupForm";
import Home from "./components/Home";
import { me } from "./store";
import SingleProduct from "./components/SingleProduct";
import OrderConfirmation from "./components/CheckoutConfirmation";
import SingleUser from './components/SingleUser'
import Cart from "./components/Cart";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
// consider crossover functionality
  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/" exact component={AllProducts} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/products/:id" component={SingleProduct}/>
            <Route path="/users/:userid" component={SingleUser} />
            <Route exact path="/cart/:id" component={Cart} />

          </Switch>
        ) : (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/" exact component={Home} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route path="/cart/:id" component={Cart} />
            <Route exact path="/cart/checkout" component={OrderConfirmation} />
          </Switch>
        )}
        {/* {isAdmin ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/" exact component={AllProducts} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/products/:id" component={SingleProduct}/>

            <Route path="/users" component={Users} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/" exact component={Home} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/products/:id" component={SingleProduct} />
          </Switch>
        )} */}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
