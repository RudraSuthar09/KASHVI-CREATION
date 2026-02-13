import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("email"); // default to Email method
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      let endpoint;
      const data = method === "otp" ? { phone } : { email };

      if (method === "otp") {
        endpoint = "/api/auth/send-reset-otp"; // Endpoint for OTP
      } else {
        endpoint = "/api/auth/forgot-password"; // Endpoint for email-based reset
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast({ title: "Reset link sent! Check your email or phone." });
      } else {
        toast({ title: responseData.message, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error sending request", variant: "destructive" });
    }

    setLoading(false);
  };

  return (
    <div className="">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Forgot Your Password?
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your email or phone, and we'll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center space-x-4">
            <label>
              <input
                type="radio"
                name="method"
                value="email"
                checked={method === "email"}
                onChange={() => setMethod("email")}
              />
              <span>Email</span>
            </label>
            <label>
              <input
                type="radio"
                name="method"
                value="otp"
                checked={method === "otp"}
                onChange={() => setMethod("otp")}
              />
              <span>Phone (OTP)</span>
            </label>
          </div>

          {method === "email" ? (
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          ) : (
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          )}

          <button
            type="submit"
            className="w-full bg-[#0a373b] hover:bg-[#085b60] text-white font-semibold py-2 rounded-md transition duration-300"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/auth/login" className="text-[#0a373b] hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
