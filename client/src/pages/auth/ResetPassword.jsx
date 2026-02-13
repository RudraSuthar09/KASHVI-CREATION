import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import zxcvbn from "zxcvbn"; // ✅ Import zxcvbn

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const passwordStrength = zxcvbn(newPassword); // ✅ Check password strength

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords do not match. Please try again", variant: "destructive" });
      return;
    }

    // ✅ Enforce strong password
    if (passwordStrength.score < 3) {
      toast({
        title: "Weak password! Please choose a stronger one",
        description: "Please use at least one uppercase letter, one number, and one special character",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/reset-password", {
        token,
        newPassword,
      });

      toast({ title: "Password reset successful!"});
      navigate("/auth/login");
    } catch (error) {
      toast({ title: "Error resetting password", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">New Password</label>
            <input
              type="password"
              className="w-full px-2 py-2 border border-gray-300 rounded-md"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <div className={`mt-2 text-sm font-medium ${passwordStrength.score < 3 ? "text-red-500" : "text-green-500"}`}>
              Strength: {["Weak", "Weak", "Fair", "Good", "Strong"][passwordStrength.score]}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Confirm Password</label>
            <input
              type="password"
              className="w-[400px] px-2 py-2  border border-gray-300 rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0a373b] hover:bg-[#085b60] text-white py-2 rounded-md transition"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
