import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const isAuthenticated = localStorage.getItem('token');

  return (
    <>
      <nav>
        <h2 className='_navbar_title' style={{ color: "#0d47a1" }}>STRATEGIN</h2> 
        {isAuthenticated && ( <h5 className='_pageTitle'> Welcome  </h5> ) }
        <ul>
          {isAuthenticated ? (
           
            <li className='_logout'>
              <a href="#" onClick={handleLogout}>Logout</a>
            </li>
          ) : (
            
            <>
              <li className='_register'>
                <Link to="/register">Register</Link>
              </li>
              <li className='_login'>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
