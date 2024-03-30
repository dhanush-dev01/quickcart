import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';

const AdminLogin = () => {
  const [admin_id, setAdminId] = useState('');
  const [admin_name, setAdminName] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/adminlogin', { admin_id, admin_name });
      console.log('Login successful:', response.data);
      setLoggedIn(true);
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  if (loggedIn) {
    return null; // Redirect to home page if already logged in
  }

  return (
    <div>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className='login' onSubmit={handleSubmit}>
        <h3>Admin Login</h3>
        <label htmlFor="admin_id">Admin ID</label>
        <input type="text" placeholder="Admin ID" id="admin_id" value={admin_id} onChange={(e) => setAdminId(e.target.value)} />
        <label htmlFor="admin_name">Admin Name</label>
        <input type="text" placeholder="Admin Name" id="admin_name" value={admin_name} onChange={(e) => setAdminName(e.target.value)} />
        <button type="submit" className='login1'>Log In</button>
      </form>
    </div>
  );
}

export default AdminLogin;
