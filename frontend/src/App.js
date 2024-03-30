import React, { useState } from 'react';
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

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/customerlogin" element={<Login/>} />
          <Route path="/adminlogin" element={<AdminLogin/>} />
          <Route path="/adminconsole" element={<Adminconsole/>} />
          <Route path="/home" element={<Products/>} />
          <Route path="/" element={<RoleSelection/>} />
          </Routes>
    </Router>
  );
}

export default App;
