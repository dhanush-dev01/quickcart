import React, { useState, useEffect } from "react";
import axios from "axios";
import "./outwardform.css";
import { useParams } from "react-router-dom";
const OutwardForm = () => {
  const { customerId, productId } = useParams();
  const [formData, setFormData] = useState({
    organization_name: "",
    address: "",
    eway_bill_number: "",
    invoice_number: "",
    delivery_challan_number: "",
    accessoryrecived: "",
    calibration_report_number: "",
    date_of_dispatch: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/form/getoutwardForm/${customerId}/${productId}`
      );
      console.log(response);
      const data = response.data;
      console.log("data", data);
      console.log("data", data[0].accessoryrecived);
      // Set default values in the form state
      setFormData(data[0]);
      // Set equipment name to trigger model number population
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/form/outwardForm",
        {
          ...formData,
          customer_id: customerId, // Include customer_id obtained from URL parameter
          pro_id: productId, // Include pro_id obtained from URL parameter
        }
      );
      console.log(response.data);
      // Reset form data after successful submission
      setFormData({
        organization_name: "",
        address: "",
        eway_bill_number: "",
        invoice_number: "",
        delivery_challan_number: "",
        accessoryrecived: "",
        calibration_report_number: "",
        date_of_dispatch: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>OUTWARD FORM</h2>
      <form onSubmit={handleSubmit} method="post" id="outwardForm">
        <label htmlFor="organization_name">Organization Name:</label>
        <input
          type="text"
          id="organization_name"
          name="organization_name"
          value={formData.organization_name}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        ></textarea>
        <br />

        <label htmlFor="eway_bill_number">Eway Bill Number:</label>
        <input
          type="text"
          id="eway_bill_number"
          name="eway_bill_number"
          value={formData.eway_bill_number}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="invoice_number">Invoice Number:</label>
        <input
          type="text"
          id="invoice_number"
          name="invoice_number"
          value={formData.invoice_number}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="delivery_challan_number">
          Delivery Challan Number:
        </label>
        <input
          type="text"
          id="delivery_challan_number"
          name="delivery_challan_number"
          value={formData.delivery_challan_number}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="accessoryrecived">Outward Accessories:</label>
        <input
          type="text"
          id="accessoryrecived"
          name="accessoryrecived"
          value={formData.accessoryrecived}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="calibration_report_number">
          Calibration Report Number:
        </label>
        <input
          type="text"
          id="calibration_report_number"
          name="calibration_report_number"
          value={formData.calibration_report_number}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="date_of_dispatch">Date Of Dispatch:current::{formData.date_of_dispatch}</label>
        <input
          type="date"
          id="date_of_dispatch"
          name="date_of_dispatch"
          value={formData.date_of_dispatch}
          onChange={handleInputChange}
        />
        <br />
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default OutwardForm;
