import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <div>
     <Link to="/login">Login</Link>
     <Link to="/signup">Sign Up</Link>
     <a href="https://www.youtube.com/watch?v=9FA__4fLBos&t=48s">
            Learn More About Us
          </a>
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
