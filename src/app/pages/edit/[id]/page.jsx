"use client";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const EditTask = () => {
  const [taskData, setTaskData] = useState({
    Task_Tittle: "",
    Task_description: "",
    Task_Satut: "Pending",
  });
  const route=useRouter()

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const params = useParams();
  const id = decodeURIComponent(params.id);
  const apicall = async () => {
    try {
      const apicallurl = await fetch(`/api/Taskadd/showTask/${id}`);
      const convertjson = await apicallurl.json();
      setTaskData(convertjson.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    apicall();
  }, []);

  const updated = async (e) => {
   e.preventDefault();
    try {
      const apicall = await fetch(`/api/Taskadd/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      const apiconvert=await apicall.json();
    //   route.push("/")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg p-6 rounded-xl w-[450px]">
          <h2 className="text-xl font-bold text-center mb-4 text-blue-600">
            Edit New Task
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
            onClick={updated}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Update Task
          </button>
        </div>
      </div>
    </>
  );
};

export default EditTask;
