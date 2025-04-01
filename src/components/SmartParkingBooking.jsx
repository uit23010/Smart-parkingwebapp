import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./SmartParkingBooking.css";

const SmartParkingBooking = () => {
  const navigate = useNavigate(); 
  return (
    <div>
     
      <h1 className="heading">Express Avenue Mall Parking</h1>

      <div className="container">
     
        <div className="left-column">
          <h2>Express Avenue Mall Parking</h2>
          <p>
            <strong>Address:</strong><br />
            Express Avenue Mall,<br />
            Whites Road,<br />
            Chennai
          </p>

          
          <div className="pricing">
            <strong>Pricing:</strong>
            <ul>
              <li>1 Hour - $5</li>
              <li>2 Hours - $9</li>
              <li>3 Hours - $12</li>
              <li>4 Hours - $15</li>
              <li>5+ Hours - $20</li>
            </ul>
          </div>

          <p>
            This parking space is secure and monitored 24/7. Conveniently located near major attractions.
          </p>
        </div>

        
        <div className="right-column">
          <label>Entry Time:</label>
          <input type="datetime-local" />

          <label>Exit Time:</label>
          <input type="datetime-local" />

          <p><strong>Total Slots:</strong> 100</p>
          <p><strong>Remaining Slots:</strong> 45</p>

         
          <div className="parking-grid">
            {Array.from({ length: 100 }).map((_, index) => (
              <div key={index} className={`slot ${index < 55 ? "filled" : "available"}`}></div>
            ))}
          </div>
        </div>
      </div>

      <div className="terms-and-payment">
        <p>1. Parking fees are non-refundable.</p>
        <p>2. Vehicles parked beyond paid hours will incur additional charges.</p>
        <button className="pay-now-btn" onClick={() => navigate("/payment")}>Pay Now</button>
      </div>
    </div>
  );
};

export default SmartParkingBooking;
