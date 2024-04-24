import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './inwardform.css';
import { useParams } from 'react-router-dom';

const InwardForm = () => {
    const { customerId, productId } = useParams(); 
    const [equipmentName, setEquipmentName] = useState('');
    const [modelNumbers, setModelNumbers] = useState([]);
    const [accessories, setAccessories] = useState([]);
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
            const response = await axios.get(`http://localhost:5002/api/form/getinwardForm/${customerId}/${productId}`);
            const data = response.data;
            console.log("data",response)
            // Set default values in the form state
            setFormData({
                customername: data.customername,
                address: data.address,
                contactnumber: data.contactnumber,
                equipmentname: data.equipmentname,
                modelnumber: data.modelnumber,
                serialnumber: data.serialnumber,
                kitsreceived: data.kitsreceived,
                accessories_received: data.accessories_received,
                customer_email: data.customer_email
            });

            // Set equipment name to trigger model number population
            setEquipmentName(data.equipmentname || '');
        } catch (error) {
            console.error('Error fetching form data:', error);
        }
    }

    useEffect(() => {
        populateModelNumbers();
    }, [equipmentName]); 

    const populateModelNumbers = () => {
        switch (equipmentName) {
            case 'ET':
                setModelNumbers(['ET 46D', 'ET 46S']);
                break;
            case 'IT':
                setModelNumbers(['IT 5A10', 'IT 10A10', 'IT 15A10']);
                break;
            case 'TFR':
                setModelNumbers(['TFR-45hf', 'TFR-75hf']);
                break;
            case 'DC':
                setModelNumbers(['DC 361', 'DC 361P', 'DC 451P']);
                break;
            case 'Offline fault locator':
                setModelNumbers(['MAX 3', 'Max SLS', 'ACCUMAX']);
                break;
            default:
                setModelNumbers([]);
                break;
        }
    }

    const addAccessory = () => {
        setAccessories([...accessories, { name: '', quantity: 1 }]);
    }

    const handleAccessoryChange = (index, field, value) => {
        const updatedAccessories = [...accessories];
        updatedAccessories[index][field] = value;
        setAccessories(updatedAccessories);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'equipmentname') {
            setEquipmentName(value);
            setFormData({
                ...formData,
                equipmentname: value
            });
        } else if (name === 'modelnumber') {
            setFormData({
                ...formData,
                modelnumber: value
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {
            const response = await axios.post('http://localhost:5002/api/form/inwardForm', {
                ...formData,
                customer_id: customerId, // Include customer_id obtained from URL parameter
                pro_id: productId // Include pro_id obtained from URL parameter
            });
            console.log(response.data);
            // Reset form data after successful submission
            setFormData({
                customername: '',
                address: '',
                contactnumber: '',
                equipmentname: '',
                modelnumber: '',
                serialnumber: '',
                kitsreceived: '',
                accessories_received: '',
                customer_email: ''
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <h2>INWARD FORM</h2>
            <form onSubmit={handleSubmit} method="post" id="inwardForm">
                <label htmlFor="customername">Customer Name:</label>
                <input type="text" id="customername" name="customername" value={formData.customername} onChange={handleInputChange}/><br/>

                <label htmlFor="address">Address:</label>
                <textarea id="address" name="address" value={formData.address} onChange={handleInputChange}></textarea><br/>

                <label htmlFor="contactnumber">Contact Number:</label>
                <input type="text" id="contactnumber" name="contactnumber" value={formData.contactnumber} onChange={handleInputChange}/><br/>

                <div className="custom-select">
                    <label htmlFor="equipmentname">Equipment Name:</label>
                    <select id="equipmentname" name="equipmentname" onChange={handleInputChange}>
                        <option value="">Select Equipment</option>
                        <option value="ET">DC EARTH RESISTANCE TESTER</option>
                        <option value="IT">INSULATION TESTER</option>
                        <option value="TFR">PREZIOHM TFR</option>
                        <option value="Offline fault locator">OFFLINE FAULT LOCATOR</option>
                        <option value="DC">DC EARTH FAULT LOCATOR</option>
                    </select>
                    <div className="select-arrow">&#9660;</div>
                </div><br/>

                <label htmlFor="modelnumber">Model Number:</label>
                <select id="modelnumber" name="modelnumber" value={formData.modelnumber} onChange={handleInputChange}>
                    <option value="">Select Model Number</option>
                    {modelNumbers.map((model, index) => (
                        <option key={index} value={model}>{model}</option>
                    ))}
                </select><br/>

                <label htmlFor="serialnumber">Serial Number:</label>
                <input type="text" id="serialnumber" name="serialnumber" value={formData.serialnumber} onChange={handleInputChange}/><br/>

                <label htmlFor="kitsreceived">Kits Received:</label>
                <input type="text" id="kitsreceived" name="kitsreceived" value={formData.kitsreceived} onChange={handleInputChange}/><br/>

                <label htmlFor="accessories_received">Accessories Received:</label>
                <input type="text" id="accessories_received" name="accessories_received" value={formData.accessories_received} onChange={handleInputChange}/><br/>

                <label htmlFor="customer_email">Customer Email:</label>
                <input type="email" id="customer_email" name="customer_email" value={formData.customer_email} onChange={handleInputChange}/><br/><br/>

                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default InwardForm;
