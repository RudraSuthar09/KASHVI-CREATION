import { Outlet } from "react-router-dom";
import signimage from "@/assets/sign-in-image1.png"
function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div
        className="hidden md:flex items-center justify-center w-1/2 px-12"
        style={{ background: `url(${signimage}) center/cover no-repeat` }}
      >
        {/* <div className="max-w-md space-y-1 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#efe7df]">
            KASHVI CREATION
          </h1>
          <p className="text-lg text-[#efe7df]">
            Join us to access our latest and most exciting collections!
          </p>
        </div> */}

      </div>
      <div className="flex flex-1 items-center justify-center bg-[#EDE8D1] px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
