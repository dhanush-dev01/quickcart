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
            src="https://image.makewebcdn.com/makeweb/m_1920x0/WFGOSRooO/adsproduct/418.jpg"
            alt=""
          />
          <div className="details">
            <a href="/phases">buy now</a>
          </div>
        </div>
        <div className="card">
          <img
            src="https://image.makewebcdn.com/makeweb/m_1920x0/WFGOSRooO/adsproduct/418.jpg"
            alt=""
          />
          <div className="details">
            <a href="/phases">buy now</a>
          </div>
        </div>
        <div className="card">
          <img
            src="https://image.makewebcdn.com/makeweb/m_1920x0/WFGOSRooO/adsproduct/418.jpg"
            alt=""
          />
          <div className="details">
            <a href="/phases">buy now</a>
          </div>
        </div>
        <div className="card">
          <img
            src="https://image.makewebcdn.com/makeweb/m_1920x0/WFGOSRooO/adsproduct/418.jpg"
            alt=""
          />
          <div className="details">
            <a href="/phases">buy now</a>
          </div>
        </div>
      </div>

      <div className="footer"></div>
    </div>
  );
};

export default Home;
