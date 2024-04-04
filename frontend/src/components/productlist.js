import React, { useState, useEffect } from "react";
import "./home.css"; // Import CSS file for styling
import axios from "axios";
const Productlist = ({customerId}) => {
const productId = 3;
const userid = "cus01";
    const assignProduct = async (e) => {
        // e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/products/assign', { userid, productId });
            console.log('assignment successful:', response.data);
            // setLoggedIn(true);
            // localStorage.setItem('isLoggedIn', 'true');
            // setIsLoggedIn(true);
            // navigate('/adminconsole');
          } catch (error) {
            console.error('assignment failed:', error.response.data);
          }
      };
      const unAssignProduct = async (e) => {
        // e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/products/unassign', { customerId });
            console.log('unassignment successful:', response.data);
            // setLoggedIn(true);
            // localStorage.setItem('isLoggedIn', 'true');
            // setIsLoggedIn(true);
            // navigate('/adminconsole');
          } catch (error) {
            console.error('unassignment failed:', error.response.data);
          }
      };

  return (
    <div>
      <h1 id="products">Available Products</h1>
      <div className="cardmain">
        <div className="card">
          <img
            src="/Product_Images/DC_Earth_Fault_Locator.jpg"
            alt=""
          />
          <div className="details">
     
            <a href="/phases">Assign</a>
       
          {/* <button onClick={assignProduct}>Assign</button>
          <button onClick={unAssignProduct}>Remove</button> */}

          </div>
        </div>
        <div className="card">
          <img
            src="/Product_Images/DC_Earth_Resistance_Tester.jpg"
            alt=""
          />
          <div className="details">
            <a href="/phases">Assign</a>
          </div>
        </div>
        <div className="card">
          <img
            src="/Product_Images/Insulation_Tester.jpg"
            alt=""
          />
          <div className="details">
            <a href="/phases">Assign</a>
          </div>
        </div>
        <div className="card">
          <img
            src="/Product_Images/Offline_Fault_Locator.jpg"
            alt=""
          />
          <div className="details">
            <a href="/phases">Assign</a>
          </div>
        </div>
      </div>

      <div className="footer"></div>
    </div>
  );
};

export default Productlist;
