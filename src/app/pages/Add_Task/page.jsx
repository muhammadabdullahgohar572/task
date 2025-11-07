"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AddTask = () => {
  const router = useRouter();

  const [taskData, setTaskData] = useState({
    Task_Tittle: "",
    Task_description: "",
    Task_Satut: "Pending",
  });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (!taskData.Task_Tittle || !taskData.Task_description) {
        return toast.error("Please Fill All Required Fields");
      }

      const apicall = await fetch("/api/Taskadd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const res = await apicall.json();

      if (res.success) {
        toast.success("Task Added Successfully");
        setTimeout(() => {
          router.push("/");
        }, 800);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-6 rounded-xl w-[450px]">
        <h2 className="text-xl font-bold text-center mb-4 text-blue-600">
          Add New Task
        </h2>

        <input
          type="text"
          name="Task_Tittle"
          placeholder="Task Title"
          value={taskData.Task_Tittle}
          onChange={handleChange}
          className="w-full border p-2 rounded-md mb-4"
        />

        <textarea
          name="Task_description"
          placeholder="Task Description"
          value={taskData.Task_description}
          onChange={handleChange}
          className="w-full border p-2 rounded-md mb-4 h-24"
        ></textarea>

        <select
          name="Task_Satut"
          value={taskData.Task_Satut}
          onChange={handleChange}
          className="w-full border p-2 rounded-md mb-4"
        >
          <option value="Pending">Pending</option>
          <option value="complete">Complete</option>
        </select>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTask;
