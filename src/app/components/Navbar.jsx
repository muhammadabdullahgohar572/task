"use client";
import { useState } from "react";
import { LayoutList, PlusCircle, LogIn, LogOut, UserPlus } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <nav className="w-full bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <div className="text-3xl cursor-pointer font-bold text-blue-600 tracking-wide">
       <Link href={"/"}>
        TaskHub
       </Link>
      </div>

      <ul className="flex gap-8 text-gray-700 font-medium text-lg">
        <Link href={"/pages/showpages"}>
        <li className="flex items-center gap-2 hover:text-blue-600 cursor-pointer transition">
          <LayoutList size={20} /> Show Tasks
        </li>
        </Link>

        <Link href={"/pages/Add_Task"}>
          <li className="flex items-center gap-2 hover:text-blue-600 cursor-pointer transition">
            <PlusCircle size={20} /> Add Task
          </li>
        </Link>
      </ul>

      <div className="flex gap-4">
        {isLoggedIn ? (
          <>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition duration-200"
            >
              <LogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <>
          <Link href={"/pages/Login"}>
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-200"
              >
                <LogIn size={18} /> Login
              </button>
            </Link>
            <Link href={"/pages/Signup"}>
              <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200">
                <UserPlus size={18} /> Signup
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
