import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LeaveHistory = () => {
  const { id } = useParams(); // URL se employee id le rahe
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  console.log("id: ",id)

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://hrms-backend-five.vercel.app/api/leaves/user/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.success) {
          setLeaves(response.data.leaves);
        } else {
          setLeaves([]);
        }
      } catch (error) {
        console.error("Error fetching leave history:", error);
        setLeaves([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [id]);

  const calculateDays = (from, to) => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const diffTime = toDate - fromDate;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6">
               {/* <button
      onClick={() => navigate("/admin-dashboard/employees")}
      className="mb-4 flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold"
    >
      ← Back 
    </button> */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Leave History
        </h2>

        <div className="overflow-x-auto rounded-xl shadow-lg">
          {loading ? (
            <p className="p-6 text-gray-500 text-center">Loading leave history...</p>
          ) : leaves.length === 0 ? (
            <p className="p-6 text-gray-500 text-center">No leave history found.</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">S.No</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Leave Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">From</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">To</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Applied On</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Days</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaves.map((leave, index) => (
                  <tr key={leave._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{leave.leaveType}</td>
                    <td className="px-4 py-3">{new Date(leave.from).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{new Date(leave.to).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{leave.description}</td>
                    <td className="px-4 py-3">{new Date(leave.appliedAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{calculateDays(leave.from, leave.to)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          leave.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : leave.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/admin-dashboard/employees"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition"
          >
            Back to Employees
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeaveHistory;
