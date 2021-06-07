import React from 'react'
import {
  Link,
} from 'react-router-dom';
const Navbar = () => {

  return(
    <div className="navbar">
      <div className="content-link">
        <Link className="link" to="/">Home</Link>
      </div>
    </div>
  )
}

export default Navbar