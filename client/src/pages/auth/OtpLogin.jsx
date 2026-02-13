import { useState } from "react";
import axios from "axios";

const OtpLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter Phone, Step 2: Enter OTP
  const [message, setMessage] = useState("");

  // 🔹 Send OTP Request
  const sendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/send-otp", { phone });
      if (response.data.success) {
        setStep(2);
        setMessage("OTP sent successfully!");
      } else {
        setMessage("Failed to send OTP.");
      }
    } catch (error) {
      setMessage("Error sending OTP.");
    }
  };

  // 🔹 Verify OTP Request
  const verifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/verify-otp", { phone, enteredOtp: otp });
      if (response.data.success) {
        setMessage("✅ Login Successful!");
        // Redirect or store authentication token (JWT or session)
      } else {
        setMessage("❌ Invalid OTP, try again.");
      }
    } catch (error) {
      setMessage("Error verifying OTP.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>OTP Login</h2>

      {step === 1 ? (
        <>
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}

      <p>{message}</p>
    </div>
  );
};

export default OtpLogin;
