// RoleSelection.js
import React from 'react';
import { Link } from 'react-router-dom';

const RoleSelection = () => {
  return (
    <div>
      <h2>Select Your Role</h2>
      <Link to="/customerlogin">Customer</Link>
      <Link to="/adminlogin">Admin</Link>
    </div>
  );
}

export default RoleSelection;
