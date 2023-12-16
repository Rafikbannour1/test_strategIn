import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isAuthenticated = localStorage.getItem('token');

  return (
    <>
      <nav>
        <h2 style={{ color: "#0d47a1" }}>STRATEGIN</h2>
        <ul>
          {isAuthenticated ? (
           
            <li>
              <a href="#" onClick={handleLogout}>Logout</a>
            </li>
          ) : (
            
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
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
