import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { Header } from "./Header";

const Navbar = ({ handleClick, isLoggedIn, user }) => (
  <div>
    <Header />
    <nav>
      {isLoggedIn ? (
        <div className="container">
          {/* The navbar will show these links after you log in */}
          <div className="singleContainer">
            <Link to="/home">Home</Link>
          </div>
          <div className="singleContainer">
            <Link to="/products"> All Products </Link>
          </div>
          <div className="singleContainer">
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
          <div className="singleContainer">
            <Link to="/users/:id">My Profile</Link>
          </div>
          <div className="singleContainer">
            <Link to={`/cart/${user.id}`}>My Cart</Link>
          </div>
        </div>
      ) : (
        <div className="container">
          {/* The navbar will show these links before you log in */}
          <div className="singleContainer">
            <Link to="/login">Login</Link>
          </div>
          <div className="singleContainer">
            <Link to="/signup">Sign Up</Link>
          </div>
          <div className="singleContainer">
            <Link to="/home">Home</Link>
          </div>
          <div className="singleContainer">
            <Link to="/products"> All Products </Link>
          </div>
          <div className="singleContainer">
            <Link to={`/cart/${user.id}`}>My Cart</Link>
          </div>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
