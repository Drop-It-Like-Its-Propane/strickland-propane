import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <div className="container">
     <div className="singleContainer"><Link to="/products"> All Products  </Link></div>
     <div className="singleContainer"><Link to="/login"> Login  </Link></div>
     <div className="singleContainer"><Link to="/signup"> Sign Up  </Link></div>
     <div className="singleContainer"><a href="https://www.youtube.com/watch?v=9FA__4fLBos&t=48s">
             Learn More About Us
          </a></div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
