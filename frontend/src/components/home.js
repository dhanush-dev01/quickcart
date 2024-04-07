import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css"; // Import CSS file for styling

const Home = () => {
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const currentUser = localStorage.getItem('customer_id');
        console.log(currentUser)
        const response = await axios.get('http://localhost:5001/api/listuserproducts', { currentUser });
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
              <a href="/phases">buy now</a>
            </div>
          </div>
        ))}
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default Home;
