import React, { useState, useEffect } from 'react';
import "./App.css";
import Products from "./components/product";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/login";
import Phases from "./components/phases";
import InwardForm from "./components/inwardform";
import OutwardForm from "./components/outwardform";
import QuotationForm from "./components/qutationform";
import RoleSelection from './components/loginhome';
import Adminconsole from './components/adminconsole';
import AdminLogin from './components/adminlogin';
import ProductsList from './components/productlist';
import Userphases from './components/userphase';
import InwardFormcus from './components/inwardformcus';
import UserQuotationForm from './components/userqutation';
import OutwardFormcus from './components/outwardformcus';
import RequestForm from './components/notify';
import RequestsList from './components/adminnotify';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();
    // const isAuthenticated = false;

    useEffect(() => {
      if(localStorage.getItem('isLoggedIn') === 'true'){
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }, [isLoggedIn]); // Add isLoggedIn as a dependency
    
  return (
    <Router>
        <Routes>
          <Route path="/customerlogin" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/adminlogin" element={<AdminLogin setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/listcomponents/:customerId" element={<ProductsList />} />
          <Route path="/inwardfromcus/:customerId/:productId" element={<InwardFormcus />} />
          <Route path="/outwardformcus/:customerId/:productId" element={<OutwardFormcus />} />
          <Route path="/request/:customerId" element={<RequestForm />} />
          <Route path="/adminconsole" element={isLoggedIn ? <Adminconsole/> : <Navigate to="/adminconsole" />} />
          <Route path="/home" element={isLoggedIn ? <Products/> : <Navigate to="/" />} />
          <Route path="/phases/:customerId/:productId" element={<Phases/>} />
          <Route path="/userphases/:customerId/:productId" element={<Userphases/>} />
          <Route path="/inward/:customerId/:productId" element={<InwardForm/>} />
          <Route path="/requests" element={<RequestsList/>} />
          <Route path="/qutcus/:customerId/:productId" element={<UserQuotationForm/>} />
          <Route path="/qutationform/:customerId/:productId" element={<QuotationForm/>} />
          <Route path="/outwardform/:customerId/:productId" element={<OutwardForm/>} />
          <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <RoleSelection/>} />
          </Routes>
    </Router>
  );
}

export default App;
