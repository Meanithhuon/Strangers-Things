import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logout, token }) => {
  return (
    <header>
      <nav className='navbar' >
        <Link className = 'navlink' to='/'>Home</Link>
        <Link to='/posts'>Posts</Link>
        <Link to='/profile'>Profile</Link>
        <Link to='/posts/post'>Create A New Posting</Link>
        
        
        {/* if user has token, give option to log out */}
        {/* if user does not have token, have user register first and log in  */}
        {
          token ? (
            <Link to='/' onClick={ () => logout() }>Logout</Link>
          ) : (
            <>
              <Link to='/register'>Register</Link>
              <Link to='/login'>Login</Link>
            </>
          )
        }
      </nav>
    </header>
  )
}

export default Navbar;