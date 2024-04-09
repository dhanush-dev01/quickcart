import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Productlist = () => {
  const { customerId } = useParams(); // Extract customerId from URL
  const [products, setProducts] = useState([]);
  const [userProducts, setUserProducts] = useState([]);

  console.log(customerId)
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

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        console.log(customerId);
        const response = await axios.post('http://localhost:5001/api/listuserproducts', { customer_id: customerId });
        console.log("User products:", response.data); 
        setUserProducts(response.data);
        console.log(setUserProducts)
      } catch (error) {
        console.error('Error fetching user products:', error);
      }
    };

    fetchUserProducts();
  }, []);

  const unassignProduct = async (productId) => {
    console.log("Assigning product with ID:", productId); // Debugging statement
    try {
      const response = await axios.post("http://localhost:5001/api/products/unassign", { productId });
      console.log("Product assigned successfully:", response.data);
      window.alert(`Product ${productId} assigned to customer ${customerId} successfully!`);
      // Optionally, you can refresh the product list after assignment
      // fetchProducts();
    } catch (error) {
      console.error("Error assigning product:", error);
    }
  };

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
      <h1>Available Products</h1>
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
      <h1>Assigned Products</h1>
      {/* <div className="cardmain">
        {userProducts.map((product) => (
          <div className="card" key={product.product_id}>
            <img src={product.product_image_path} alt={product.products_name} />
            
            <div className="details">
              <a href="/phases">status</a>
              <button onClick={() => unassignProduct(product.product_id)}>Unassign</button>
            </div>
          </div>
        ))}
      </div> */}

<div className="cardmain">
  {userProducts.map((p) => {
// Debugging statement
    return (
      <div className="card" key={p.product_id}>
        <img src={p.product_image_path} alt={p.products_name} />
        <div className="details">
          <a href="/phases">status</a>
          <button onClick={() => unassignProduct(p.product_id)}>Unassign</button>
        </div>
      </div>
    );
  })}
</div>


    </div>
  );
};

export default Productlist;
