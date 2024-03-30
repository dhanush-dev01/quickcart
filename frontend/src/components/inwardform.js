// InwardForm.js

import React, { useEffect, useState } from 'react';
import './inwardform.css';

const InwardForm = () => {
    const [equipmentName, setEquipmentName] = useState('');
    const [modelNumbers, setModelNumbers] = useState([]);
    const [accessories, setAccessories] = useState([]);

    useEffect(() => {
        populateModelNumbers();
    }, []);

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

    return (
        <div>
            <h2>INWARD FORM</h2>
            <form action="submit_form.php" method="post" id="inwardForm">
                <label htmlFor="customer_name">Customer Name:</label>
                <input type="text" id="customer_name" name="customer_name"/><br/>

                <label htmlFor="address">Address:</label>
                <textarea id="address" name="address"></textarea><br/>

                <label htmlFor="contact_number">Contact Number:</label>
                <input type="text" id="contact_number" name="contact_number"/><br/>

                <div className="custom-select">
                    <label htmlFor="equipment_name">Equipment Name:</label>
                    <select id="equipment_name" name="equipment_name" onChange={(e) => setEquipmentName(e.target.value)}>
                        <option value="">Select Equipment</option>
                        <option value="ET">DC EARTH RESISTANCE TESTER</option>
                        <option value="IT">INSULATION TESTER</option>
                        <option value="TFR">PREZIOHM TFR</option>
                        <option value="Offline fault locator">OFFLINE FAULT LOCATOR</option>
                        <option value="DC">DC EARTH FAULT LOCATOR</option>
                    </select>
                    <div className="select-arrow">&#9660;</div>
                </div><br/>

                <label htmlFor="model_number">Model Number:</label>
                <select id="model_number" name="model_number">
                    <option value="">Select Model Number</option>
                    {modelNumbers.map((model, index) => (
                        <option key={index} value={model}>{model}</option>
                    ))}
                </select><br/>

                <label htmlFor="serial_number">Serial Number:</label>
                <input type="text" id="serial_number" name="serial_number"/><br/>

                <label htmlFor="kits_received">Kits Received:</label>
                <input type="text" id="kits_received" name="kits_received"/><br/>

                <label htmlFor="accessories_received">Accessories Received:</label>
                <div id="accessories_container">
                    {accessories.map((accessory, index) => (
                        <div key={index}>
                            <input type="text" value={accessory.name} placeholder="Accessory Name" onChange={(e) => handleAccessoryChange(index, 'name', e.target.value)} required/>
                            <input type="number" value={accessory.quantity} min="1" placeholder="Quantity" onChange={(e) => handleAccessoryChange(index, 'quantity', e.target.value)} required/>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={addAccessory}>Add Accessory</button><br/><br/>

                <label htmlFor="customer_email">Customer Email:</label>
                <input type="email" id="customer_email" name="customer_email"/><br/><br/>

                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default InwardForm;
