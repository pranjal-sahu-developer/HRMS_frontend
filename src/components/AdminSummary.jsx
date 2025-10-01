import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, Building2, DollarSign, ClipboardList, CheckCircle, Clock, XCircle } from "lucide-react";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("https://hrms-backend-five.vercel.app/api/admin/summary", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (res.data.success) {
          setSummary(res.data.summary);
        }
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Loading summary...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl transition">
          <Users className="w-12 h-12 text-orange-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Employees</h3>
            <p className="text-2xl font-bold text-gray-900">{summary?.totalEmployees || 0}</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl transition">
          <Building2 className="w-12 h-12 text-orange-400" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Departments</h3>
            <p className="text-2xl font-bold text-gray-900">{summary?.totalDepartments || 0}</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl transition">
          <DollarSign className="w-12 h-12 text-yellow-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Monthly Salary</h3>
            <p className="text-2xl font-bold text-gray-900">₹{summary?.monthlySalary || 0}</p>
          </div>
        </div>
      </div>

      {/* Leave Details */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Leave Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl transition">
          <ClipboardList className="w-12 h-12 text-purple-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Leave Applied</h3>
            <p className="text-2xl font-bold text-gray-900">{summary?.leaveApplied || 0}</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl transition">
          <CheckCircle className="w-12 h-12 text-green-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Leave Approved</h3>
            <p className="text-2xl font-bold text-gray-900">{summary?.leaveApproved || 0}</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl transition">
          <Clock className="w-12 h-12 text-yellow-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Leave Pending</h3>
            <p className="text-2xl font-bold text-gray-900">{summary?.leavePending || 0}</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl transition">
          <XCircle className="w-12 h-12 text-red-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Leave Rejected</h3>
            <p className="text-2xl font-bold text-gray-900">{summary?.leaveRejected || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
