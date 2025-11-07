"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const route = useRouter();
  const [loginData, setLoginData] = useState({
    user_Email: "",
    user_password: "",
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const LoginFunction = async () => {
    try {
      if (!loginData.user_Email || !loginData.user_password) {
        return toast.error("Please Fill All Details", {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
        });
      }

      const apicall = await fetch("/api/useradd/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const apires = await apicall.json();

      if (apires.message == "User Login Successfully") {
        toast.success("Login Successfully", {
          position: "top-center",
          theme: "dark",
        });
        setTimeout(() => {
          route.push("/");
        }, 1000);
      } else {
        toast.error(apires.message, {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form className="bg-white shadow-lg p-8 rounded-xl w-[400px]">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Login to Your Account
          </h2>

          {/* Email */}
          <label className="block mb-2 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="user_Email"
            placeholder="Enter your email"
            value={loginData.user_Email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-blue-600 mb-4"
          />

          {/* Password */}
          <label className="block mb-2 font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="user_password"
            placeholder="Enter your password"
            value={loginData.user_password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-blue-600 mb-6"
          />

          {/* Submit Button */}
          <button
            onClick={LoginFunction}
            type="button"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
