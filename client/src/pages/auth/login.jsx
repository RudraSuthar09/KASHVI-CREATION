import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // ✅ Handle form submission and user login
  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
        title: "Logged in Successfully!",
        });

        // ✅ Store user info in Redux after successful login
        const { user } = data.payload; // Assuming user data is in the payload
        if (user && user._id) {
          console.log("User logged in:", user);
          // Dispatch action to store user data in Redux
          dispatch({
            type: 'auth/setUser', // Assuming you have a 'setUser' action to store user data
            payload: user,
          });

          // Optionally fetch cart items for the user after login (if needed)
          // dispatch(fetchCartItems(user._id));  // Uncomment if needed
        }
      } else {
        toast({
          title: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h4 className="text-3xl font-bold tracking-tight text-foreground text-black">
          Welcome to Kashvi Creation!
        </h4>
        <p className="text-[#0a373b] text-sm">Login to your account</p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <p className="mt-2 text-center">
        Don't have an account?<br />
        <Link
          className="font-medium ml-2 text-primary hover:underline"
          to="/auth/register"
        >
          Register now
        </Link>
      </p>
      <div className="text-center">
        <Link
          className="text-sm text-primary hover:underline"
          to="/auth/forgot-password"
        >
          Forgot Password?
        </Link>
      </div>
    </div>
  );
}

export default AuthLogin;
