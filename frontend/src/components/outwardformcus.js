import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './inwardfromcus.css';
import { useParams } from 'react-router-dom';
const OutwardFormcus = () => {
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
    return (
        <div className='cus_details'>
            <h1>Details of the product</h1>
            <span className='fontchange'>customer id: {formData.customer_id} </span>
            <span className='fontchange'>organization_name: {formData.organization_name} </span>
            <span className='fontchange'>eway_bill_number: {formData.eway_bill_number} </span>
            <span className='fontchange'>invoice_number: {formData.invoice_number} </span>
            <span className='fontchange'>Address: {formData.address} </span>
            <span className='fontchange'>Product ID: {formData.pro_id} </span>
            <span className='fontchange'>delivery_challan_number: {formData.delivery_challan_number} </span>
            <span className='fontchange'>calibration_report_number: {formData.calibration_report_number} </span>
            <span className='fontchange'>date_of_dispatch: {formData.date_of_dispatch} </span>
            <span className='fontchange'>Accessories Received: {formData.accessoryrecived} </span>
        </div>
            );
        }
        
        export default OutwardFormcus;