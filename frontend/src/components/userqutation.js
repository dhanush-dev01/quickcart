import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './quotationform.css';
import { useParams } from 'react-router-dom';

const UserQuotationForm = () => {
    const { customerId, productId } = useParams(); 
    const [formData, setFormData] = useState({
        quotation_no: '',
        quotation_date: '',
        customer_id: customerId, // Add customer_id from URL parameter
        pro_id: productId // Add pro_id from URL parameter
    });

    useEffect(() => {
        fetchData();
    }, []); 

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/api/form/quotationForm/${customerId}/${productId}`);
            const data = response.data;
            // Set default values in the form state
            setFormData(data);
        } catch (error) {
            console.error('Error fetching quotation data:', error);
        }
    }

    return (
        <div className="cus_details">
            <h2>QUOTATION Details</h2>
            <span className='fontchange'>quotation_no: {formData.quotation_no}</span>
            <span className='fontchange'>quotation_no: {formData.quotation_date}</span>
        </div>
    );
}

export default UserQuotationForm;
