import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RequestsList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/form/getinwardForm/requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleState = async (customerId, currentState) => {
    try {
      const newState = currentState === 0 ? 1 : 0;
      await axios.post('http://localhost:5001/api/updatestatus', { state: newState, customer_id: customerId });
      // Update local state to reflect the change
      setRequests(prevRequests =>
        prevRequests.map(request =>
          request.customer_id === customerId ? { ...request, state: newState } : request
        )
      );
    } catch (error) {
      console.error('Error toggling state:', error);
    }
  };

  const deleteRequest = async (customerId) => {
    try {
      await axios.post('http://localhost:5001/api/deleterequest', { customer_id: customerId });
      // Filter out the deleted request from the list
      setRequests(prevRequests => prevRequests.filter(request => request.customer_id !== customerId));
      // Show alert for successful deletion
      alert('Request deleted successfully for');
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  const getStatusColor = (state) => {
    return state === 0 ? 'red' : '#7CFC00'; // Red for pending (state 0), green for approved (state 1)
  };

  const getStatusText = (state) => {
    return state === 0 ? 'Approval Pending' : 'Approved';
  };

  return (
    <div>
      <h2>Requests List</h2>
      <ul>
        {requests.map((request, index) => (
          <li key={index}>
            <strong>Customer ID:</strong> {request.customer_id}<br />
            <strong>Product ID:</strong> {request.productName}<br />
            <strong>Model name:</strong> {request.modelName}<br />
            <div className="status" style={{ backgroundColor: getStatusColor(request.state) }}>
              {getStatusText(request.state)}
            </div>
            <button onClick={() => toggleState(request.customer_id, request.state)}>
              Toggle State
            </button>
            <button onClick={() => deleteRequest(request.customer_id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestsList;
