import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import mapImage from "/src/assets/navigation1.jpg";
 import mapImage1 from "/src/assets/smartpark.png";
 import mapImage3 from "/src/assets/navigation4.jpg";
 import mapImage2 from "/src/assets/navigation3.jpg";
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Top Section: Two Columns */}
      <div className="top-section">
        <div className="left-section">
          <h1 className="smart-park">Smart Park</h1>
          <p className="quote">No more parking stress—just Smart Park and go!</p>
        </div>

        {/* Right Section - Image & Buttons Above It */}
        <div className="right-section">
          {/* Buttons Above the Image */}
          <div className="button-group">
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/signup")}>Sign Up</button>
            <button onClick={() => navigate("/dashboard")}>Book Now</button>
          </div>
          
          {/* Image */}
          <img src={mapImage} alt="Smart Park Map" className="map-image" />
        </div>
      </div>
      <div className="how-it-works">
  <h2>How It Works</h2>
  <div className="steps-container">
    <div className="step">
      <img src={mapImage1} alt="Find Parking" />
      <p><strong>Find Parking:</strong> Search for available spots in real-time.</p>
    </div>
    <div className="step">
      <img src={mapImage2} alt="Book Instantly" />
      <p><strong>Book Instantly:</strong> Reserve your spot and pay securely.</p>
    </div>
    <div className="step">
      <img src={mapImage3} alt="Park & Enjoy" />
      <p><strong>Park & Enjoy:</strong> Navigate to your spot and park stress-free.</p>
      {/* New Sections Below */}
      <div className="extra-content">
        {/* Features Section */}
        <div className="features-section">
          <h2>Why Choose Smart Park?</h2>
          <div className="features">
            <div className="feature">
              <p>✅ Easy Booking</p>
            </div>
            <div className="feature">
              <p>✅ Secure Parking</p>
            </div>
            <div className="feature">
              <p>✅ Affordable Rates</p>
            </div>
          </div>
        </div>

       

        {/* Contact Section */}
        <div className="contact">
          <h2>Contact Us</h2>
          <p>Email: support@smartpark.com</p>
          <p>Phone: +123 456 789</p>
          {/* How It Works Section */}

    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
