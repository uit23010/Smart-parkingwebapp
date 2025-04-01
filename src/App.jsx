import React from "react";
import { Routes, Route } from "react-router-dom"; 
import HomePage from "./components/Homepage";
import Loginpage from "./components/LoginPage";
import SignupPage from "./components/Signuppage";
import Dashboard from "./components/Dashboard";
import SmartParkingPage from "./components/SmartParkingBooking";
import PaymentForm from "./components/Payment";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/smart-parking" element={<SmartParkingPage />} />
      <Route path="/payment" element={<PaymentForm />} />
    </Routes>
  );
}

export default App;
