import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RequestForm = () => {
  const { customerId } = useParams(); 
  const [formData, setFormData] = useState({
    customerName: '',
    productName: '',
    customer_id: customerId,
    modelName: '',
    state: 0
  });
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/form/notify/${customerId}`);
      const data = response.data;
      console.log("data", data);
      // Set default values in the form state if data is available
      if (data.length > 0) {
        setFormData(data[0]);
        setHasData(true);
      } else {
        setHasData(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    try {
      const response = await axios.post('http://localhost:5001/api/form/notify', formData);
      console.log(response.data);
      // Reset form data after successful submission
      setFormData({
        customerName: '',
        productName: '',
        customer_id: customerId,
        modelName: '',
        state: 0
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Request Form</h2>
      {hasData ? (
        <p>Current Request</p>
      ) : (
        <p>There is no request</p>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="customerName">Customer Name:</label>
        <input type="text" id="customerName" name="customerName" value={formData?.customerName || ''} onChange={handleInputChange} /><br />

        <label htmlFor="productName">Product Name:</label>
        <input type="text" id="productName" name="productName" value={formData?.productName || ''} onChange={handleInputChange} /><br />

        <label htmlFor="modelName">Model Name:</label>
        <input type="text" id="modelName" name="modelName" value={formData?.modelName || ''} onChange={handleInputChange} /><br />

        <div style={{ backgroundColor: formData.state === 1 ? '#7CFC00' : 'red' }}>
          State: {formData.state === 1 ? 'Approved' : 'Approval Pending'}
        </div>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default RequestForm;
