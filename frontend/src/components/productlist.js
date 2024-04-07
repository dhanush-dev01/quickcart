import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Productlist = () => {
  const { customerId } = useParams(); // Extract customerId from URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const assignProduct = async (productId) => {
    console.log("Assigning product with ID:", productId); // Debugging statement
    try {
      const response = await axios.post("http://localhost:5001/api/products/assign", { customerId, productId });
      console.log("Product assigned successfully:", response.data);
      window.alert(`Product ${productId} assigned to customer ${customerId} successfully!`);
      // Optionally, you can refresh the product list after assignment
      // fetchProducts();
    } catch (error) {
      console.error("Error assigning product:", error);
    }
  };
  

  return (
    <div>
      <h1 id="products">Available Products</h1>
      <div className="cardmain">
        {products.map((product) => (
          <div className="card" key={product.product_id}>
            <img src={product.product_image_path} alt={product.product_name} />
            <div className="details">
              <span>{product.product_name}</span>
              <button onClick={() => assignProduct(product.product_id)}>Assign</button>
              
              {/* Add any additional product details here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productlist;
