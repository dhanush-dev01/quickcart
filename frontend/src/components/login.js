import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom
import './login.css';
import axios from 'axios';

const Login = () => {
  const [customer_id, setCustomerId] = useState('');
  const [customer_name, setCustomerName] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate(); // Get history object from React Router

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { customer_id, customer_name });
      console.log('Login successful:', response.data);
      setLoggedIn(true);
      // Redirect to home page after successful login
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  if (loggedIn) {
    // Redirect to home page if already logged in
    return null; // or any loading indicator if needed
  }

  return (
    <div>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className='login' onSubmit={handleSubmit}>
        <h3>customer login</h3>
        <label htmlFor="customer_id">Customer ID</label>
        <input type="text" placeholder="Customer ID" id="customer_id" value={customer_id} onChange={(e) => setCustomerId(e.target.value)} />
        <label htmlFor="customer_name">Customer Name</label>
        <input type="text" placeholder="Customer Name" id="customer_name" value={customer_name} onChange={(e) => setCustomerName(e.target.value)} />
        <button type="submit" className='login1'>Log In</button>
      </form>
    </div>
  );
}

export default Login;
