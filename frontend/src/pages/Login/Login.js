import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../common/styles/form.css';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`http://localhost:5000/login`, formData);
      console.log('Login successful:', response.data);

      localStorage.setItem('token', response.data.token);
      navigate('/users');
    } catch (error) {
      console.error('Login failed:', error.message);
      setError(error.response.data.message || 'Login failed. Please try again.');
    }
  };
  
  
  return (
    <div id="feedback-form">
      <h2 className="header">Login</h2>
      <div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
