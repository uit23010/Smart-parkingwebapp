import React, { useState } from "react";
import "./Signuppage.css";
import Dashboard from "./Dashboard";

const SignupPage = ({ onSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSignup = () => {
    if (!termsAccepted) {
      alert("You must agree to the Terms and Conditions before signing up.");
      return;
    }
    alert("Signup Successful!");
    onSignup();
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
        />
        I agree to the Terms and Conditions
      </label>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default SignupPage;
