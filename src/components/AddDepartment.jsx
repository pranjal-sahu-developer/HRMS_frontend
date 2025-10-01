import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddDepartment = () => {
  const navigate = useNavigate();
  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
   try {
         const response = await axios.post(
      "http://localhost:5001/api/department/add",
      { dep_name: departmentName, description },
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

        if(response.data.success)
        {
            navigate("/admin-dashboard/departments")
        }
   } catch (error) {
        if(error.response && !error.response.data.success)
        {
            alert(error.response.data.error)
        }
   }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-start">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <button
      onClick={() => navigate(-1)}
      className="mb-4 flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold"
    >
      ← Back 
    </button>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add New Department
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Department Name</label>
            <input
              type="text"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;

