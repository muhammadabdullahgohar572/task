"use client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const route = useRouter();
  const [fromData, setFromData] = useState({
    user_name: "",
    user_Email: "",
    user_password: "",
    user_Gender: "",
  });

  const userSignup = async (e) => {
    e.preventDefault();

    if (
      !fromData.user_name ||
      !fromData.user_Email ||
      !fromData.user_password ||
      !fromData.user_Gender
    ) {
      return toast.error("Please Fill All Details", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
    }

    try {
      const res = await fetch("/api/useradd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fromData),
      });

      const data = await res.json();

      if (data.message == "User Registered Successfully") {
        toast.success("User Registered Successfully", {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
        });
        setTimeout(()=>{
          route.push("/pages/Login");
        },1000)
      } else {
        toast.error(data, {
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white shadow-lg p-8 rounded-xl w-[400px]">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Create Account
        </h2>

        <label className="block mb-2 font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={fromData.user_name}
          onChange={(e) =>
            setFromData({ ...fromData, user_name: e.target.value })
          }
          placeholder="Enter your name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-blue-600 mb-4"
        />

        <label className="block mb-2 font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={fromData.user_Email}
          onChange={(e) =>
            setFromData({ ...fromData, user_Email: e.target.value })
          }
          name="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-blue-600 mb-4"
        />

        <label className="block mb-2 font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={fromData.user_password}
          onChange={(e) =>
            setFromData({ ...fromData, user_password: e.target.value })
          }
          placeholder="Create a password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-blue-600 mb-4"
        />

        <label className="block mb-2 font-medium text-gray-700">Gender</label>
        <select
          name="gender"
          value={fromData.user_Gender}
          onChange={(e) =>
            setFromData({ ...fromData, user_Gender: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg focus:outline-blue-600 mb-6"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <button
          type="button"
          onClick={userSignup}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
