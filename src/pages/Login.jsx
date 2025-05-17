import React, { useState } from "react";
import Wrapper from "@/components/Wrapper";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoaderIcon } from "lucide-react";
import { EyeClosed, Eye } from "lucide-react";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full md:py-20">
      <ToastContainer />
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Login
          </div>
        </div>

        <div className="text-center max-w-[800px] mx-auto my-[30px] md:my-[40px]">
          <form className="bg-white p-8 rounded-lg shadow-lg">
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="bg-gray-100 border border-gray-300 text-black px-6 py-4 w-full mt-8 rounded transition duration-200 focus:outline-none focus:ring-1 focus:ring-black text-lg"
            />

            <div className="relative mt-8">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="bg-gray-100 border border-gray-300 text-black px-6 py-4 w-full rounded transition duration-200 focus:outline-none focus:ring-1 focus:ring-black text-lg pr-10"
              />
              <div
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword((prevData) => !prevData)}
              >
                {showPassword ? <EyeClosed /> : <Eye />}
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                className="py-4 px-10 rounded-lg bg-black text-white text-lg font-medium transition-transform active:scale-95 hover:opacity-75"
                type="submit"
                disabled={loader}
              >
                {loader ? (
                  <LoaderIcon
                    className="animate-spin text-white"
                    style={{ width: "24px", height: "24px" }}
                  />
                ) : (
                  "Login"
                )}
              </button>
            </div>

            <div className="flex justify-between mt-6 text-md text-black space-x-4 flex-col md:flex-row">
              <p className="mt-6">
                Don't have an account?{" "}
                <Link to={"/register"} className="underline">
                  Register now
                </Link>
              </p>
              <p className="mt-6">
                Forgot Password?
                <Link to={"/forgot-password"} className="underline">
                  Reset Password
                </Link>
              </p>
            </div>
          </form>
        </div>
      </Wrapper>
    </div>
  );
};

export default Login;
