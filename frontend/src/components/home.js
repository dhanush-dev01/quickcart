import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css"; // Import CSS file for styling
import { Link } from "react-router-dom";

const Home = () => {
  const [userProducts, setUserProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const currentUserID = localStorage.getItem('customer_id');
        setCurrentUser(currentUserID);
        console.log(currentUserID);
        const response = await axios.post('http://localhost:5001/api/listuserproducts', { customer_id: currentUserID });
        console.log(response.data);
        setUserProducts(response.data);
      } catch (error) {
        console.error('Error fetching user products:', error);
      }
    };

    fetchUserProducts();
  }, []);

  return (
    <div>
      <div className="sliders">
        <div className="photo1"></div>
      </div>
      <h1 id="products">Assigned Products</h1>
      <div className="cardmain">
        {userProducts.map((product, index) => (
          <div className="card" key={index}>
            {/* <img src={`/Product_Images/${product.products_name}.jpg`} alt={product.products_name} /> */}
            <img src={product.product_image_path} alt={product.products_name} />
            <div className="details">
              <Link to={`/userphases/${currentUser}/${product.product_id}`}>
                status
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default Home;
