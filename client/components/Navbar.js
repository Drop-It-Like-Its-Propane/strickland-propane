import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { Header } from './Header'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <Header />
    <nav>
      {isLoggedIn ? (
        <div className="container">
          {/* The navbar will show these links after you log in */}
          <div className="singleContainer"><Link to="/home">Home</Link></div>
          <div className="singleContainer"><a href="#" onClick={handleClick}>
            Logout
          </a></div>
          <div className="singleContainer"><Link to="/SingleUser">My Profile</Link></div>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
