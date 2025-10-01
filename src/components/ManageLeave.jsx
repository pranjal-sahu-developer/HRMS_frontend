import React, { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch leaves from backend
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://hrms-backend-five.vercel.app/api/leaves/my-leaves",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) setLeaves(response.data.leaves);
      } catch (error) {
        console.error("Error fetching leaves:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  const filteredLeaves = leaves.filter(
    (leave) =>
      leave.type.toLowerCase().includes(search.toLowerCase()) ||
      leave.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 md:mb-0">
          Manage Leaves
        </h1>

        <div className="flex gap-3">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search leaves..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>

          {/* Add Leave Button */}
          <button
            onClick={() => navigate("/employee-dashboard/add-leave")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl shadow-md transition"
          >
            Add Leave
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 text-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">S.No</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Leave Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">From</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">To</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Applied Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  Loading leaves...
                </td>
              </tr>
            ) : filteredLeaves.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No leaves found.
                </td>
              </tr>
            ) : (
              filteredLeaves.map((leave, index) => (
                <tr
                  key={leave._id}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium">{leave.type}</td>
                  <td className="px-6 py-4">{new Date(leave.from).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{new Date(leave.to).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{leave.description}</td>
                  <td className="px-6 py-4">{new Date(leave.appliedAt).toLocaleDateString()}</td>
                  <td
                    className={`px-6 py-4 font-semibold ${
                      leave.status === "Approved"
                        ? "text-green-600"
                        : leave.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {leave.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageLeave;
