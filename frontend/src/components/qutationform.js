import React from 'react';
import './quotationform.css';

const QuotationForm = () => {
    return (
        <div className="container">
            <h2>QUOTATION FORM</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="quotation_no">Quotation No:</label>
                    <input type="text" id="quotation_no" name="quotation_no"/>
                </div>
                <div className="form-group">
                    <label htmlFor="quotation_date">Quotation Date:</label>
                    <input type="date" id="quotation_date" name="quotation_date"/>
                </div>
                <div className="form-group">
                    <input type="submit" value="Submit"/>
                </div>
            </form>
        </div>
    );
}

export default QuotationForm;
