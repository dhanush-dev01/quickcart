import React, { useState } from 'react';
import './phases.css';

function Phases() {
    const [selectedPhase, setSelectedPhase] = useState('');

    const selectPhase = (phaseName) => {
        if (selectedPhase === phaseName) {
            // If the clicked phase is already selected, clear the selection
            setSelectedPhase('');
        } else {
            // Otherwise, select the clicked phase
            setSelectedPhase(phaseName);
        }
    };

    return (
        <div>
            <div className="container">
                <h2>SERVICE PHASES</h2>
                <div className="phases">
                    <div className={`phase ${selectedPhase === 'Reception' ? 'selected' : ''}`} onClick={() => selectPhase('Reception')}>
                        <h3>Reception</h3>
                        <p><a href="/inwardform" target="_blank">Fill Inward Form</a></p>
                    </div>
                    <div className={`phase ${selectedPhase === 'Evaluation' ? 'selected' : ''}`} onClick={() => selectPhase('Evaluation')}>
                        <h3>Evaluation</h3>
                    </div>
                    <div className={`phase ${selectedPhase === 'Quotation' ? 'selected' : ''}`} onClick={() => selectPhase('Quotation')}>
                        <h3>Quotation</h3>
                        <p><a href="quotationform" target="_blank">Fill Quotation Form</a></p>
                    </div>
                    <div className={`phase ${selectedPhase === 'Awaiting for the Work Order' ? 'selected' : ''}`} onClick={() => selectPhase('Awaiting for the Work Order')}>
                        <h3>Awaiting for the Work Order</h3>
                    </div>
                </div>
                <div className="phases">
                    <div className={`phase ${selectedPhase === 'Service in Progress' ? 'selected' : ''}`} onClick={() => selectPhase('Service in Progress')}>
                        <h3>Service in Progress</h3>
                    </div>
                    <div className={`phase ${selectedPhase === 'Calibration' ? 'selected' : ''}`} onClick={() => selectPhase('Calibration')}>
                        <h3>Calibration</h3>
                    </div>
                    <div className={`phase ${selectedPhase === 'Packing' ? 'selected' : ''}`} onClick={() => selectPhase('Packing')}>
                        <h3>Packing</h3>
                    </div>
                    <div className={`phase ${selectedPhase === 'Dispatched' ? 'selected' : ''}`} onClick={() => selectPhase('Dispatched')}>
                        <h3>Dispatched</h3>
                        <p><a href="/outwardform" target="_blank">Fill Outward Form</a></p>
                    </div>
                </div>
                <div className={`phase delivery ${selectedPhase === 'Delivery' ? 'selected' : ''}`} onClick={() => selectPhase('Delivery')}>
                    <h3>Delivery</h3>
                </div>
            </div>
            <button className="close-button">Close</button>
        </div>
    );
}

export default Phases;
