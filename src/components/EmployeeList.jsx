


import React, { useState, useEffect } from "react";
import { Eye, Pencil, DollarSign, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeList = () => {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5; // 5 employees per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("https://hrms-backend-five.vercel.app/api/employee/list", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (response.data.success && Array.isArray(response.data.employees)) {
          setEmployees(response.data.employees);
        } else {
          setEmployees([]);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Filter employees based on search
  const filteredEmployees = employees.filter((emp) =>
    emp.userId?.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLast = currentPage * employeesPerPage;
  const indexOfFirst = indexOfLast - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Manage Employees
        </h2>

        {/* Search + Add Button */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search employee by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            onClick={() => navigate("/admin-dashboard/add-employees")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-xl shadow-md transition-all duration-200"
          >
            + Add New Employee
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl shadow-lg">
          {loading ? (
            <p className="p-6 text-gray-500">Loading employees...</p>
          ) : currentEmployees.length === 0 ? (
            <p className="p-6 text-gray-500">No employees found.</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">S.No</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Image</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">DOB</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Department</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentEmployees.map((emp, index) => (
                  <tr key={emp._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 whitespace-nowrap">{indexOfFirst + index + 1}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <img
                        src={emp.userId?.profileImage ? `https://hrms-backend-five.vercel.app/${emp.userId.profileImage}` : "https://via.placeholder.com/60"}
                        alt={emp.userId?.name || "Employee"}
                        className="w-14 h-14 rounded-full border shadow-sm object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-800">{emp.userId?.name || "-"}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{emp.dob ? new Date(emp.dob).toLocaleDateString() : "-"}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{emp.department?.dep_name || "-"}</td>
                    <td className="px-4 py-3 whitespace-nowrap flex flex-wrap gap-2">
                      <button
                        onClick={() => navigate(`/admin-dashboard/employee/${emp._id}`)}
                        className="flex items-center bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg shadow-sm transition"
                      >
                        <Eye className="w-4 h-4 mr-1" /> View
                      </button>
                      <button
                        onClick={() => navigate(`/admin-dashboard/edit-employee/${emp._id}`)}
                        className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg shadow-sm transition"
                      >
                        <Pencil className="w-4 h-4 mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => navigate(`/admin-dashboard/salary/${emp._id}`)}
                        className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg shadow-sm transition"
                      >
                        <DollarSign className="w-4 h-4 mr-1" /> Salary
                      </button>
                      <button
                        onClick={() => navigate(`/admin-dashboard/leave/${emp.userId._id}`)}
                        className="flex items-center bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg shadow-sm transition"
                      >
                        <Calendar className="w-4 h-4 mr-1" /> Leave
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
