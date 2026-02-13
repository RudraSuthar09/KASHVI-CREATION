import { useState } from "react";
import axios from "axios";

const OtpResetPassword = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  // 🔹 Send OTP
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

  // 🔹 Verify OTP and Reset Password
  const resetPassword = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/verify-otp", { phone, enteredOtp: otp });

      if (response.data.success) {
        // Now, reset the password
        await axios.post("http://localhost:5000/api/auth/reset-password-otp", { phone, newPassword });
        setMessage("✅ Password Reset Successful!");
      } else {
        setMessage("❌ Invalid OTP, try again.");
      }
    } catch (error) {
      setMessage("Error resetting password.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Reset Password via OTP</h2>

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
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={resetPassword}>Reset Password</button>
        </>
      )}

      <p>{message}</p>
    </div>
  );
};

export default OtpResetPassword;
