import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './phases.css';

function Phases() {
    const { customerId, productId } = useParams();
    

    return (
        <div>
            <div className="container">
                <h2>SERVICE PHASES</h2>
                <div className="phases">
                    <div className="phase">
                        <h3>Reception</h3>
                        <p><a href="/inward" target="_blank">Fill Inward Form</a></p>
                    </div>
                    <div className="phase">
                        <h3>Evaluation</h3>
                    </div>
                    <div className="phase">
                        <h3>Quotation</h3>
                        <p><a href="quotationform" target="_blank">Fill Quotation Form</a></p>
                    </div>
                    <div className="phase">
                        <h3>Awaiting for the Work Order</h3>
                    </div>
                </div>
                <div className="phases">
                    <div className="phase">
                        <h3>Service in Progress</h3>
                    </div>
                    <div className="phase">
                        <h3>Calibration</h3>
                    </div>
                    <div className="phase">
                        <h3>Packing</h3>
                    </div>
                    <div className="phase">
                        <h3>Dispatched</h3>
                        <p><a href="/outwardform" target="_blank">Fill Outward Form</a></p>
                    </div>
                </div>
                <div className="phase">
                    <h3>Delivery</h3>
                </div>
            </div>
            <button className="close-button">Close</button>
        </div>
    );
}

export default Phases;
