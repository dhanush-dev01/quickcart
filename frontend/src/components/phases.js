import React from 'react';
import './phases.css';

function Phases() {
    const selectPhase = (phaseName) => {
        alert("You selected: " + phaseName);
        // You can add more actions here such as showing/hiding content or navigating to another page
    }

    const closeDeliveryPhase = () => {
        alert("Service phases closed");
        // Add functionality to close the delivery phase here
    }

    return (
        <div>
        <div class="container">
        <h2>SERVICE PHASES</h2>
        <div class="phases">
            <div class="phase" onclick="selectPhase(this, 'Reception')">
                <h3>Reception</h3>
                
                <p><a href="/inwardform" target="_blank">Fill Inward Form</a></p>
            </div>
            <div class="phase" onclick="selectPhase(this, 'Evaluation')">
                <h3>Evaluation</h3>
               
            </div>
            <div class="phase" onclick="selectPhase(this, 'Quotation')">
                <h3>Quotation</h3>
               
                <p><a href="quotationform" target="_blank">Fill Quotation Form</a></p>
            </div>
            <div class="phase" onclick="selectPhase(this, 'Awaiting for the Work Order')">
                <h3>Awaiting for the Work Order</h3>
               
            </div>
        </div>
        <div class="phases">
            <div class="phase" onclick="selectPhase(this, 'Service in Progress')">
                <h3>Service in Progress</h3>
               
            </div>
            <div class="phase" onclick="selectPhase(this, 'Calibration')">
                <h3>Calibration</h3>
                
            </div>
            <div class="phase" onclick="selectPhase(this, 'Packing')">
                <h3>Packing</h3>
                
            </div>
            <div class="phase" onclick="selectPhase(this, 'Dispatched')">
                <h3>Dispatched</h3>
               
                <p><a href="/outwardform" target="_blank">Fill Outward Form</a></p>
            </div>
        </div>
        <div class="phases">
            <div class="phase delivery" onclick="selectPhase(this, 'Delivery')">
                <h3>Delivery</h3>
                
            </div>
        </div>
    </div>
    <button class="close-button" onclick="closeDeliveryPhase()">Close</button>
    </div>
    );
}

export default Phases;
