import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './userphase.css';

function Userphases() {
    const { customerId, productId } = useParams();
    const [phases, setPhases] = useState({
        reception: 0,
        evaluation: 0,
        quotation: 0,
        awaiting_work_order: 0,
        service_in_progress: 0,
        calibration: 0,
        packing: 0,
        dispatched: 0,
        delivery: 0
    });

    useEffect(() => {
        const fetchStatus = async () => {
            try { // Get both customer ID and product ID
                const response = await axios.get(`http://localhost:5001/api/getstatus/${customerId}/${productId}`); // Update URL with both IDs
                const data = response.data[0]; // Assuming only one record is returned
                setPhases({
                    reception: data.reception,
                    evaluation: data.evaluation,
                    quotation: data.quotation,
                    awaiting_work_order: data.awaiting_work_order,
                    service_in_progress: data.service_in_progress,
                    calibration: data.calibration,
                    packing: data.packing,
                    dispatched: data.dispatched,
                    delivery: data.delivery
                });
                console.log(response)
            } catch (error) {
                console.error('Error fetching phase status:', error);
            }
        };
    
        fetchStatus();
    }, [customerId, productId]); // Include productId in the dependency array
    
    
    return (
        <div>
            <div className="container">
                <h2>SERVICE PHASES</h2>
                <div className="phases">
                    <div className={`phase ${phases.reception === 1 ? 'completed' : ''}`}>
                        <h3>Reception</h3>
                        <p><a href="/inward" target="_blank">Fill Inward Form</a></p>
                    </div>
                    <div className={`phase ${phases.evaluation === 1 ? 'completed' : ''}`}>
                        <h3>Evaluation</h3>
                    </div>
                    <div className={`phase ${phases.quotation === 1 ? 'completed' : ''}`}>
                        <h3>Quotation</h3>
                        <p><a href="quotationform" target="_blank">Fill Quotation Form</a></p>
                    </div>
                    <div className={`phase ${phases.awaiting_work_order === 1 ? 'completed' : ''}`}>
                        <h3>Awaiting for the Work Order</h3>
                    </div>
                </div>
                <div className="phases">
                    <div className={`phase ${phases.service_in_progress === 1 ? 'completed' : ''}`}>
                        <h3>Service in Progress</h3>
                    </div>
                    <div className={`phase ${phases.calibration === 1 ? 'completed' : ''}`}>
                        <h3>Calibration</h3>
                    </div>
                    <div className={`phase ${phases.packing === 1 ? 'completed' : ''}`}>
                        <h3>Packing</h3>
                    </div>
                    <div className={`phase ${phases.dispatched === 1 ? 'completed' : ''}`}>
                        <h3>Dispatched</h3>
                        <p><a href="/outwardform" target="_blank">Fill Outward Form</a></p>
                    </div>
                </div>
                <div className={`phase ${phases.delivery === 1 ? 'completed' : ''}`}>
                    <h3>Delivery</h3>
                </div>
            </div>
        </div>
    );
}

export default Userphases;
