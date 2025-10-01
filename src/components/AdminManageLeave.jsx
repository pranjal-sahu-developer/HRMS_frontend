import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Eye, X } from "lucide-react";

const AdminManageLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const leavesPerPage = 5;

  // Fetch Leaves
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5001/api/leaves", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setLeaves(response.data.leaves);
          setFilteredLeaves(response.data.leaves);
        }
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };
    fetchLeaves();
  }, []);

  // Search + Filter Logic
  useEffect(() => {
    let data = [...leaves];

    if (filterStatus !== "All") {
      data = data.filter((leave) => leave.status === filterStatus);
    }

    if (searchTerm.trim() !== "") {
      data = data.filter(
        (leave) =>
          leave.userId?.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          leave.employeeId?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLeaves(data);
    setCurrentPage(1); // reset page when filter/search changes
  }, [searchTerm, filterStatus, leaves]);

  // Pagination logic
  const indexOfLastLeave = currentPage * leavesPerPage;
  const indexOfFirstLeave = indexOfLastLeave - leavesPerPage;
  const currentLeaves = filteredLeaves.slice(indexOfFirstLeave, indexOfLastLeave);
  const totalPages = Math.ceil(filteredLeaves.length / leavesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate Days
  const calculateDays = (from, to) => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const diffTime = toDate - fromDate;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleView = (leave) => {
    setSelectedLeave(leave);
    setShowModal(true);
  };

  const updateLeaveStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5001/api/leaves/status/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setLeaves((prev) =>
          prev.map((l) =>
            l._id === id ? { ...l, status: response.data.leave.status } : l
          )
        );
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Manage Leaves
        </h1>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search by Emp ID or Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>

          <div className="flex gap-3">
            {["All", "Pending", "Approved", "Rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-5 py-2 rounded-xl font-medium transition ${
                  filterStatus === status
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left">S.No</th>
                <th className="px-4 py-3 text-left">Emp ID</th>
                <th className="px-4 py-3 text-left">Leave Type</th>
                <th className="px-4 py-3 text-left">Days</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentLeaves.length > 0 ? (
                currentLeaves.map((leave, index) => (
                  <tr
                    key={leave._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">
                      {indexOfFirstLeave + index + 1}
                    </td>
                    <td className="px-4 py-3">{leave.employeeId || "-"}</td>
                    <td className="px-4 py-3">{leave.leaveType}</td>
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
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleView(leave)}
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2 mx-auto shadow-md transition"
                      >
                        <Eye size={16} /> View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    No leave requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 rounded-lg border ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedLeave && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-center text-gray-800">
              Leave Details
            </h2>

            <div className="space-y-3 text-gray-700">
              <p><span className="font-semibold">Leave Type:</span> {selectedLeave.leaveType}</p>
              <p><span className="font-semibold">From:</span> {new Date(selectedLeave.from).toLocaleDateString()}</p>
              <p><span className="font-semibold">To:</span> {new Date(selectedLeave.to).toLocaleDateString()}</p>
              <p><span className="font-semibold">Reason:</span> {selectedLeave.description}</p>
              <p><span className="font-semibold">Applied On:</span> {new Date(selectedLeave.appliedDate).toLocaleDateString()}</p>
              <p>
                <span className="font-semibold">Status:</span> 
                <span className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${
                  selectedLeave.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : selectedLeave.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}>{selectedLeave.status}</span>
              </p>
            </div>

            {selectedLeave.status === "Pending" && (
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => updateLeaveStatus(selectedLeave._id, "Approved")}
                  className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 shadow-md transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateLeaveStatus(selectedLeave._id, "Rejected")}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow-md transition"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageLeaves;
