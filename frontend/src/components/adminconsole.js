// RoleSelection.js

import Navbar from './navbar'
import React, { useState, useEffect } from 'react';
import './adminconsole.css'
import { Link } from 'react-router-dom';

import axios from 'axios'; // Import axios for making HTTP requests

const Adminconsole = () => {
  const [users, setUsers] = useState([]); // State to hold user data
  const [newUser, setNewUser] = useState({ customer_id: '', customer_name: '' }); // State to hold new user data
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal open/close

  useEffect(() => {
    // Fetch user data from the backend API
    axios.get('http://localhost:5001/api/users')
      .then(response => {
        setUsers(response.data); // Set the fetched user data to state
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []); // Run only once on component mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevNewUser => ({ ...prevNewUser, [name]: value }));
  };

  // Function to handle creating a new user
  const handleCreateUser = () => {
    // Send a POST request to your backend API to create a new user
    axios.post('http://localhost:5001/api/users/create', newUser)
      .then(response => {
        // Assuming the response contains the newly created user data
        const createdUser = response.data;
        // Update the state to include the new user
        setUsers(prevUsers => [...prevUsers, createdUser]);
        // Clear the input fields after successful creation
        setNewUser({ customer_id: '', customer_name: '' });
        // Close the modal after user creation
        setModalOpen(false);
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <h1 id="users">User Records</h1>
      <div className="cardmain">
        {users.map(user => (
          <div className="card" key={user.customer_id}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/10336/10336437.png"
              alt=""
            />
            <div className="details">
              <h3>Customer Id: {user.customer_id}</h3>
              <h3>Customer Name: {user.customer_name}</h3>
            </div>
            <Link to={`/listcomponents/${user.customer_id}`}>
            <button className='adbtn'>assign products</button>
            </Link>

          </div>
        ))}
      </div>
      <button className="open-modal-btn" onClick={() => setModalOpen(true)}>+</button>
      {modalOpen && (
        <div className="modal-container">
          <div className="modal-background" onClick={() => setModalOpen(false)}></div>
          <div className="modal-content">
            <span className="close-btn" onClick={() => setModalOpen(false)}>&times;</span>
            <h2 id="cuser">Create User</h2>
            <div className="create-user">
              <input
                type="text"
                name="customer_id"
                value={newUser.customer_id}
                onChange={handleInputChange}
                placeholder="Customer ID"
              />
              <input
                type="text"
                name="customer_name"
                value={newUser.customer_name}
                onChange={handleInputChange}
                placeholder="Customer Name"
              />
              <button className='adbtn' onClick={handleCreateUser}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Adminconsole;
