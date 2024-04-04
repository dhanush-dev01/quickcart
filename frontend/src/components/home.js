import React, { useState, useEffect } from "react";
import "./home.css"; // Import CSS file for styling
import axios from "axios";
const Home = () => {
  return (
    <div>
      <div className="sliders">
        <div className="photo1"></div>
      </div>
      <h1 id="products">Available Products</h1>
      <div className="cardmain">
        <div className="card">
          <img
            src="/Product_Images/DC_Earth_Resistance_Tester.jpg"
            alt=""
          />
          <div className="details">
            <a href="/phases">Status</a>
          </div>
        </div>
        <div className="card">
          <img
            src="/Product_Images/DC_Earth_Fault_Locator.jpg"
            alt=""
          />
          <div className="details">
            <a href="/phases">Status</a>
          </div>
        </div>
        <div className="card">
          <img
            src="/Product_Images/Insulation_Tester.jpg"
            alt=""
          />
          <div className="details">
            <a href="/phases">Status</a>
          </div>
        </div>
        <div className="card">
          <img
            src="/Product_Images/Offline_Fault_Locator.jpg"
            alt=""
          />
          <div className="details">
            <a href="/phases">Status</a>
          </div>
        </div>
      </div>

      <div className="footer"></div>
    </div>
  );
};

export default Home;
