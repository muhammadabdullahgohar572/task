"use client";

import { useEffect, useState } from "react";

const ShowTask = () => {
  const [data, setData] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/Taskadd/Test");
      const json = await res.json();
      setData(json.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Task
  const handleDelete = async (_id) => {
    try {
      await fetch(`/api/Taskadd/${_id}`, {
        method: "DELETE",
      });
      fetchTasks(); // Refresh after delete
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>

      <table className="border-collapse border border-gray-400 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item) => (
            <tr key={item._id}>
              <td className="border p-2">{item.Task_Tittle}</td>
              <td className="border p-2">{item.Task_description}</td>
              <td className="border p-2">{item.Task_Satut}</td>
              <td className="border p-2 flex gap-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowTask;
