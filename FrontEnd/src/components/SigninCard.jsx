import { useState } from "react";
import { FaLock, FaUnlock, FaArrowLeft } from "react-icons/fa"; // Added FaArrowLeft icon
import { Link } from "react-router-dom";

// Functional component for the Sign In card
const SigninCard = () => {
  // State variables for password and password visibility
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {/* Sign In card container */}
      <div className="max-w-[600px] w-full max-h-[700px] pt-10 pb-16 p-6 bg-[#F5F2F2] rounded-2xl shadow-md flex flex-col justify-center items-center">
        {/* Back button to return to the root/main page */}
        <Link to="/" className="self-start text-[#F9AB00] flex items-center">
          <FaArrowLeft className="mr-2" />
          Return
        </Link>

        {/* Title and description */}
        <div className="w-auto flex flex-col justify-center items-center mb-6">
          <h1 className="text-5xl font-bold mb-4 text-[#00083E]">Sign in</h1>
          <hr className="border-t-2 border-solid border-[#627E94] mb-2 w-full" />
          <p className="text-[#627E94]">Please fill in the form to continue</p>
        </div>

        {/* Form inputs */}
        <div className="w-full flex flex-col">
          <input
            className="w-full h-12 mt-2 mb-3 py-2 px-4 border border-gray-300 rounded-2xl"
            name="mail"
            type="email"
            placeholder="Username"
          />

          <p className="text-[#736A6A] cursor-pointer self-end">
            Forgot password?
          </p>

          <label className=" block relative h-12">
            <input
              className="w-full h-full py-2 px-4 border border-gray-300 rounded-2xl"
              name="pass"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaUnlock /> : <FaLock />}
            </span>
          </label>
        </div>

        {/* Remember me checkbox */}
        <div className="flex self-start items-center ml-2 mt-4 text-[#736A6A]">
          <input type="checkbox" className="mr-2" />
          <p>Remember me</p>
        </div>

        {/* Sign In button */}
        <Link to="/" className="w-full  ">
          <button
            className="bg-[#F9AB00] w-full h-12 text-white  mt-1 rounded-2xl hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            onClick={() => console.log("Login clicked")}
          >
            Log In
          </button>
        </Link>

        {/* Sign Up link */}
        <div className="flex items-center mt-4">
          <p className="mr-2">Don't have an account?</p>
          <p className="text-[#F9AB00] cursor-pointer">Sign Up</p>
        </div>
      </div>
    </>
  );
};

export default SigninCard;
