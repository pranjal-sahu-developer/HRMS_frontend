import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditDepartment = () => {
  const { id } = useParams(); // URL se id milega
  const navigate = useNavigate();
  const [depName, setDepName] = useState("");
  const [description, setDescription] = useState("");

  // Fetch department by id (to pre-fill form)
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/department/list", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          const dept = response.data.departments.find((d) => d._id === id);
          if (dept) {
            setDepName(dept.dep_name);
            setDescription(dept.description);
          }
        }
      } catch (error) {
        console.error("Error fetching department:", error);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5001/api/department/update/${id}`,
        { dep_name: depName, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      console.error("Error updating department:", error);
      alert("Failed to update department");
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
          Edit Department
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Department Name
            </label>
            <input
              type="text"
              value={depName}
              onChange={(e) => setDepName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all"
          >
            Update Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDepartment;
