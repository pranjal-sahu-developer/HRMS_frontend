import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DepartmentList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("https://hrms-backend-five.vercel.app/api/department/list", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (response.data.success) {
          setDepartments(response.data.departments);
        } else {
          setDepartments([]);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const filteredDepartments = departments.filter((dept) =>
    dept.dep_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;
    try {
      const response = await axios.delete(`https://hrms-backend-five.vercel.app/api/department/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data.success) {
        setDepartments(departments.filter((d) => d._id !== id));
      }
    } catch (error) {
      console.error("Error deleting department:", error);
      alert("Failed to delete department");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Manage Departments
        </h2>

        {/* Search + Add Button */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            onClick={() => navigate("/admin-dashboard/departments/add-department")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-xl shadow-md transition-all duration-200"
          >
            + Add New Department
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl shadow-lg">
          {loading ? (
            <p className="p-6 text-gray-500">Loading departments...</p>
          ) : filteredDepartments.length === 0 ? (
            <p className="p-6 text-gray-500">No departments found.</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">S.No</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Department Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDepartments.map((dept, index) => (
                  <tr key={dept._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 whitespace-nowrap">{index + 1}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-800">{dept.dep_name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">{dept.description || "-"}</td>
                    <td className="px-4 py-3 whitespace-nowrap flex gap-2">
                      <button
                        onClick={() => navigate(`/admin-dashboard/departments/edit/${dept._id}`)}
                        className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg shadow-sm transition"
                      >
                        <Pencil size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(dept._id)}
                        className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-sm transition"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentList;
