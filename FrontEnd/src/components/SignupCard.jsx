import { useState } from "react";
import { FaLock, FaUnlock, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignupCard = () => {
  // State variables for passwords and password visibility
  const [password1, setPassword1] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [password2, setPassword2] = useState("");
  const [showPassword2, setShowPassword2] = useState(false);


  return (
    <>
      {/* Signup card container */}
      <div className="max-w-[900px] w-full max-h-[700px] pt-10 pb-16 p-6 bg-[#F5F2F2] rounded-2xl shadow-md flex flex-col justify-center items-center">
        {/* Back button to return to the root/main page */}
        <Link to="/" className="self-start text-[#F9AB00] flex items-center">
          <FaArrowLeft className="mr-2" />
          Return
        </Link>

        <div className="w-auto flex flex-col justify-center items-center mb-6">
          <h1 className="text-5xl font-bold mb-4 text-[#00083E]">Sign Up</h1>
          <hr className="border-t-2 border-solid border-[#627E94] mb-2 w-full" />
          <p className="text-[#627E94]">Please fill in the form to continue</p>
        </div>

        {/* Name and Prename input fields */}
        <div className="w-full flex space-x-4">
          <input
            className="w-full h-12 my-2 py-2 px-4 border border-gray-300 rounded-2xl"
            name="name"
            type="text"
            placeholder="First Name"
          />
          <input
            className="w-full h-12 my-2 py-2 px-4 border border-gray-300 rounded-2xl"
            name="prename"
            type="text"
            placeholder="Last Name"
          />
        </div>

        {/* Email and Discord ID input fields */}
        <input
          className="w-full h-12 my-2 py-2 px-4 border border-gray-300 rounded-2xl"
          name="mail"
          type="email"
          placeholder="Email"
        />

        <input
          className="w-full h-12 my-2 py-2 px-4 border border-gray-300 rounded-2xl"
          name="discordId"
          type="text"
          placeholder="Discord ID"
        />

        {/* Password input fields */}
        <div className="w-full flex space-x-4">
          <div className="relative flex-1 my-2 h-12">
            {/* First Password */}
            <input
              className="w-full h-full py-2 px-4 border border-gray-300 
                            rounded-2xl pr-10"
              name="pass1"
              type={showPassword1 ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword1(e.target.value)}
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
              onClick={() => setShowPassword1((prev) => !prev)}
            >
              {showPassword1 ? <FaUnlock /> : <FaLock />}
            </span>
          </div>

          <div className="relative flex-1 my-2 h-12">
            {/* Second Password */}
            <input
              className="w-full h-full py-2 px-4 border border-gray-300 rounded-2xl pr-10"
              name="pass2"
              type={showPassword2 ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) => setPassword2(e.target.value)}
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
              onClick={() => setShowPassword2((prev) => !prev)}
            >
              {showPassword2 ? <FaUnlock /> : <FaLock />}
            </span>
          </div>
        </div>

        {/* Signup button */}
        <button
          className="bg-[#F9AB00] w-full h-12 text-white  mt-4 rounded-2xl hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={() => console.log("Sign Up clicked")}
        >
          Sign Up
        </button>
      </div>
    </>
  );
};

export default SignupCard;
