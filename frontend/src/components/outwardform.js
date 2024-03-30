import React from 'react';
import './outwardform.css';

const OutwardForm = () => {
    const addAccessory = () => {
        var container = document.getElementById("accessories_container");
        var accessoryInput = document.createElement("input");
        accessoryInput.type = "text";
        accessoryInput.name = "accessory[]";
        accessoryInput.placeholder = "Accessory Name";
        accessoryInput.required = true;
        container.appendChild(accessoryInput);

        var quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.name = "quantity[]";
        quantityInput.placeholder = "Quantity";
        quantityInput.min = "1";
        quantityInput.required = true;
        container.appendChild(quantityInput);

        container.appendChild(document.createElement("br"));
    }

    return (
        <div>
            <h2>OUTWARD FORM</h2>
            <form action="submit_form.php" method="post" id="outwardForm">
                <label htmlFor="organization_name">Organization Name:</label>
                <input type="text" id="organization_name" name="organization_name"/><br/>

                <label htmlFor="address">Address:</label>
                <textarea id="address" name="address"></textarea><br/>

                <label htmlFor="eway_bill_number">Eway Bill Number:</label>
                <input type="text" id="eway_bill_number" name="eway_bill_number"/><br/>

                <label htmlFor="invoice_number">Invoice Number:</label>
                <input type="text" id="invoice_number" name="invoice_number"/><br/>

                <label htmlFor="delivery_challan_number">Delivery Challan Number:</label>
                <input type="text" id="delivery_challan_number" name="delivery_challan_number"/><br/>

                <label htmlFor="outward_accessories">Outward Accessories:</label>
                <div id="accessories_container">
                    {/* Accessories will be dynamically added here */}
                </div>
                <button type="button" onClick={addAccessory}>Add Accessory</button><br/><br/>

                <label htmlFor="calibration_report_number">Calibration Report Number:</label>
                <input type="text" id="calibration_report_number" name="calibration_report_number"/><br/>

                <label htmlFor="date_of_dispatch">Date Of Dispatch:</label>
                <input type="date" id="date_of_dispatch" name="date_of_dispatch"/><br/><br/>

                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default OutwardForm;
