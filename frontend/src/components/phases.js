import React, { useState, useEffect } from "react";
import { useParams, Link} from "react-router-dom";

import axios from "axios";
import './phases.css';

function Phases() {
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
    const [hasChanges, setHasChanges] = useState(false);
    const [triggerApiCall, setTriggerApiCall] = useState(false);
    const handlePhaseClick = async (phase) => {
        try {
            // Toggle the status of the clicked phase
            const updatedPhases = { ...phases, [phase]: phases[phase] === 1 ? 0 : 1 };
            setPhases(updatedPhases);
            setHasChanges(true);
        } catch (error) {
            console.error('Error updating phase status:', error);
        }
    };

    // Function to handle form submission
    const handleSubmit = async () => {
        try {
            console.log("Updated phases:", phases);
            console.log("customerid:",customerId)
            console.log("productid:",productId)
            // Send the updated status to the setstatus endpoint
            await axios.post("http://localhost:5001/api/setstatus", {
                customer_id: customerId,
                product_id: productId,
                ...phases
            });
            setHasChanges(false);
        } catch (error) {
            console.error('Error submitting phase statuses:', error);
        }
    };
    const unassignProduct = async (productId) => {
        console.log("UnAssigning product with ID:", productId); // Debugging statement
        try {
          const response = await axios.post("http://localhost:5001/api/products/unassign", { productId });
          console.log("Product unAssigned successfully:", response.data);
          window.alert(`Product with id ${productId} unAssigned successfully for customer with id ${customerId}`);
          // Optionally, you can refresh the product list after assignment
          // fetchProducts();
          window.history.back();
        } catch (error) {
          console.error("Error assigning product:", error);
        }
        setTriggerApiCall(triggerApiCall ? false : true);
      };
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
    }, [customerId, productId]);
    return (
        <div>
            <a className="btc" href="/adminconsole">back</a>
            <div className="container">
                <h2>SERVICE PHASES</h2>
                <div className="phases">
                    <div className={`phase ${phases.reception === 1 ? 'completed' : ''}`} onClick={() => handlePhaseClick('reception')}>
                        <h3>Reception</h3>
                        <p><Link to={`/inward/${customerId}/${productId}`}>inwardform</Link></p>
                    </div>
                    <div className={`phase ${phases.evaluation === 1 ? 'completed' : ''}`} onClick={() => handlePhaseClick('evaluation')}>
                        <h3>Evaluation</h3>
                    </div>
                    <div className={`phase ${phases.quotation === 1 ? 'completed' : ''}`} onClick={() => handlePhaseClick('quotation')}>
                        <h3>Quotation</h3>
                        <p><Link to={`/qutationform/${customerId}/${productId}`}>Fill Quotation Form</Link></p>
                    </div>
                    <div className={`phase ${phases.awaiting_work_order === 1 ? 'completed' : ''}`} onClick={() => handlePhaseClick('awaiting_work_order')}>
                        <h3>Awaiting for the Work Order</h3>
                    </div>
                </div>
                <div className="phases">
                    <div className={`phase ${phases.service_in_progress === 1 ? 'completed' : ''}`} onClick={() => handlePhaseClick('service_in_progress')}>
                        <h3>Service in Progress</h3>
                    </div>
                    <div className={`phase ${phases.calibration === 1 ? 'completed' : ''}`} onClick={() => handlePhaseClick('calibration')}>
                        <h3>Calibration</h3>
                    </div>
                    <div className={`phase ${phases.packing === 1 ? 'completed' : ''}`} onClick={() => handlePhaseClick('packing')}>
                        <h3>Packing</h3>
                    </div>
                    <div className={`phase ${phases.dispatched === 1 ? 'completed' : ''}`} onClick={() => handlePhaseClick('dispatched')}>
                        <h3>Dispatched</h3>
                        <p><Link to={`/outwardform/${customerId}/${productId}`}>Fill Outward Form</Link></p>
                    </div>
                </div>
                <div className={`phase ${phases.delivery === 1 ? 'completed' : ''}`} onClick={() => handlePhaseClick('delivery')}>
                    <h3>Delivery</h3>
                </div>
            </div>
            {hasChanges && <button className="submit-button" onClick={handleSubmit}>Submit</button>}
            <button className="close-button" onClick={() => unassignProduct(productId)}>Close</button>
        </div>
    );
}

export default Phases;
