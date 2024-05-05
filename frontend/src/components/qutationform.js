import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './quotationform.css';
import { useParams } from 'react-router-dom';

const QuotationForm = () => {
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {
            const response = await axios.post('http://localhost:5001/api/form/quotationForm', formData);
            console.log(response.data);
            // Reset form data after successful submission
            setFormData({
                quotation_no: '',
                quotation_date: '',
                customer_id: customerId,
                pro_id: productId
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="container">
            <h2>QUOTATION FORM</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="quotation_no">Quotation No:</label>
                    <input type="text" id="quotation_no" name="quotation_no" value={formData.quotation_no} onChange={handleInputChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="quotation_date">Quotation Date: current::{formData.quotation_date}</label>
                    <input type="date" id="quotation_date" name="quotation_date" onChange={handleInputChange}/>
                </div>
                <div className="form-group">
                    <input type="submit" value="Submit"/>
                </div>
            </form>
        </div>
    );
}

export default QuotationForm;
