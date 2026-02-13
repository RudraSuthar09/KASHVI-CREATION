import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import zxcvbn from "zxcvbn";
import { useToast } from "@/components/ui/use-toast";
import { registerUser } from "@/store/auth-slice";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [passwordFeedback, setPasswordFeedback] = useState([
    { message: "Must be at least 5 characters long.", satisfied: false },
    { message: "Must include at least one uppercase letter.", satisfied: false },
    { message: "Must include at least one special symbol.", satisfied: false },
  ]);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function validatePassword(password) {
    const rules = [
      { rule: /.{5,}/, message: "Must be at least 5 characters long." },
      { rule: /[A-Z]/, message: "Must include at least one uppercase letter." },
      { rule: /[!@#$%^&*(),.?\":{}|<>]/, message: "Must include at least one special symbol." },
    ];

    return rules.map((item) => ({
      message: item.message,
      satisfied: item.rule.test(password),
    }));
  }

  function handlePasswordChange(event) {
    const password = event.target.value;
    setFormData({ ...formData, password });

    const strength = zxcvbn(password);
    setPasswordStrength(strength);

    setPasswordFeedback(validatePassword(password));
  }

  function onSubmit(event) {
    event.preventDefault();

    const unsatisfiedRules = passwordFeedback.filter((rule) => !rule.satisfied);
    if (unsatisfiedRules.length > 0) {
      toast({
        title: "Password does not meet the requirements!",
        description: unsatisfiedRules.map((rule) => rule.message).join("\n"),
        variant: "destructive",
      });
      return;
    }

    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Registration Successful!" });
        navigate("/auth/login");
      } else {
        toast({ title: data?.payload?.message, variant: "destructive" });
      }
    });
  }

  return (
    <div>
      <div className="text-center mb-6">
        <h4 className="text-3xl font-bold tracking-tight text-[#0a373b]">
          Welcome to Kashvi Creation!
        </h4>
        <p className="text-[#0a373b] text-sm">
          It's quick and easy to set up an account
        </p>
      </div>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <form onSubmit={onSubmit} className="space-y-2">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Username</label>
            <input
              type="text"
              className="w-[400px] px-2 py-1 border border-[#b2966c] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a373b] transition"
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-[400px] px-2 py-1 border border-[#b2966c] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a373b] transition"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <input
              type="password"
              className="w-[400px] px-2 py-1 border border-[#b2966c] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a373b] transition"
              value={formData.password}
              onFocus={() => setShowPasswordRules(true)}
              onBlur={() => setShowPasswordRules(false)}
              onChange={handlePasswordChange}
              required
            />

            {/* ✅ Show Password Strength */}
            {passwordStrength && (
              <div className="mt-2 text-xs text-gray-500">
                <p className="font-medium">
                  Strength: {["Weak", "Fair", "Good", "Strong", "Very Strong"][passwordStrength.score]}
                </p>
                <div className="h-2 w-full bg-gray-300 rounded-md">
                  <div
                    className={`h-2 ${["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-blue-500"][passwordStrength.score]} rounded-md`}
                    style={{ width: `${(passwordStrength.score + 1) * 20}%` }}
                  />
                </div>
              </div>
            )}

            {/* ✅ Show Password Rules Initially & Update Dynamically */}
            {showPasswordRules && (
              <div className="mt-2 text-xs text-black">
                <p className="font-medium">Password Requirements:</p>
                <ul className="list-disc pl-4">
                  {passwordFeedback.map((rule, index) => (
                    <li
                      key={index}
                      className={`flex items-center gap-1 transition ${
                        rule.satisfied ? "text-green-600 font-medium" : "text-red-500"
                      }`}
                    >
                      {rule.satisfied ? "✔" : "✖"} {/* ✅ Green check or Red X */}
                      <span className="text-black">{rule.message}</span> {/* Black text */}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#0a373b] text-white py-3 rounded-md hover:bg-[#085b60] transition"
          >
            Sign Up
          </button>
        </form>
      </div>

      <div className="text-center font:large mt-4">
        <p className="text-sm">
          Already have an account?{" "}
          <br />
          <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthRegister;
