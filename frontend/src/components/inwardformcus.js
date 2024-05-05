import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './inwardfromcus.css';
import { useParams } from 'react-router-dom';
const InwardFormcus = () => {
    const { customerId, productId } = useParams(); 
    const [formData, setFormData] = useState({
        customername: '',
        address: '',
        contactnumber: '',
        equipmentname: '', // Add equipmentname to formData
        modelnumber: '', // Add modelnumber to formData
        serialnumber: '',
        kitsreceived: '',
        accessories_received: '',
        customer_email: ''
    });

    useEffect(() => {
        fetchData();
    }, []); 
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/api/form/getinwardForm/${customerId}/${productId}`);
            const data = response.data;
            console.log("data",data)
            console.log("data",data[0].accessories_received)
            // Set default values in the form state
            setFormData(data[0]);
            // Set equipment name to trigger model number population
        } catch (error) {
            console.error('Error fetching form data:', error);
        }
    }
    return (
        <div className='cus_details'>
            <h1>Details of the product</h1>
            <span className='fontchange'>customer id: {formData.customer_id} </span>
            <span className='fontchange'>customer Name: {formData.customername} </span>
            <span className='fontchange'>customer Email: {formData.customer_email} </span>
            <span className='fontchange'>Contact Number: {formData.contactnumber} </span>
            <span className='fontchange'>Address: {formData.address} </span>
            <span className='fontchange'>Product ID: {formData.pro_id} </span>
            <span className='fontchange'>Equipment Name: {formData.equipmentname} </span>
            <span className='fontchange'>Model Number: {formData.modelnumber} </span>
            <span className='fontchange'>Serial Number: {formData.serialnumber} </span>
            <span className='fontchange'>Accessories Received: {formData.accessories_received} </span>
        </div>
            );
        }
        
        export default InwardFormcus;