import React, { useState } from 'react';
import axios from 'axios';
import '../../common/styles/form.css';
import { useNavigate } from "react-router-dom";

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    fullname: '',
    password: '',
    confirmPassword: '',
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
      const response = await axios.post(`http://localhost:5000/register`, formData);
      console.log('Registration successful:', response.data);

     
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.message);
      setError(error.response.data.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div id="feedback-form">
      <h2 className="header">Register</h2>
      <div>
        {error && <p className="_alert_error" style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            id='_username_register'
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            id='_fullName'
            type="text"
            name="fullname"
            placeholder="fullName"
            value={formData.fullname}
            onChange={handleChange}
          />
          <input
            id='_password_register'
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            id='_confirmPassword_register'
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
