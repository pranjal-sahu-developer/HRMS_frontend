// EmployeeSummary.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { Calendar, DollarSign, ClipboardList } from "lucide-react";

const EmployeeSummary = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [salary, setSalary] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("id",user)
  console.log("id",user._id)


  // Fetch Leaves and Salary
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);

        // Leaves
        const leaveRes = await axios.get(
          `https://hrms-backend-five.vercel.app/api/leaves/user/${user._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Salary
        const salaryRes = await axios.get(
          `https://hrms-backend-five.vercel.app/api/salary/user/${user._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setLeaves(leaveRes.data.leaves || []);
        setSalary(salaryRes.data.salary || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user._id]);



  if (loading) return <p className="p-6 text-center text-gray-500">Loading...</p>;

  // Count leaves by status
  const pendingLeaves = leaves.filter(l => l.status === "Pending").length;
  const approvedLeaves = leaves.filter(l => l.status === "Approved").length;
  const rejectedLeaves = leaves.filter(l => l.status === "Rejected").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Card */}
        <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 flex items-center justify-center bg-blue-100 text-3xl font-bold text-blue-700">
            {user.name[0]}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Hello, {user.name}!</h1>
            <p className="text-gray-600 mt-1">{user.designation || "Employee"}</p>
            {/* <p className="text-gray-500 mt-1 text-sm">Department: {user.department?.dep_name || "-"}</p> */}
          </div>
        </div>

       {/* Summary Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  {/* Total Leaves */}
  <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-xl transition">
    <Calendar className="w-10 h-10 text-blue-500 mb-2" />
    <p className="text-gray-700 text-lg font-semibold tracking-wide">Total Leaves</p>
    <p className="text-3xl font-extrabold text-gray-900">{leaves.length}</p>
  </div>

  {/* Approved Leaves */}
  <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-xl transition">
    <Calendar className="w-10 h-10 text-green-500 mb-2" />
    <p className="text-gray-700 text-lg font-semibold tracking-wide">Approved Leaves</p>
    <p className="text-3xl font-extrabold text-gray-900">{approvedLeaves}</p>
  </div>

  {/* Pending Leaves */}
  <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-xl transition">
    <Calendar className="w-10 h-10 text-yellow-500 mb-2" />
    <p className="text-gray-700 text-lg font-semibold tracking-wide">Pending Leaves</p>
    <p className="text-3xl font-extrabold text-gray-900">{pendingLeaves}</p>
  </div>
</div>

{/* Salary Card */}
<div className="bg-white shadow-lg rounded-2xl p-6 mb-8 hover:shadow-xl transition">
  <div className="flex items-center gap-4">
    <DollarSign className="w-8 h-8 text-green-500" />
    <div>
      <p className="text-gray-700 text-lg font-semibold tracking-wide">Current Salary</p>
      <p className="text-3xl font-extrabold text-gray-900">
        {salary ? `₹ ${salary.salary}` : "N/A"}
      </p>
      {salary?.allowance && (
        <p className="text-gray-600 text-sm font-medium">
          Allowance: <span className="font-semibold">₹ {salary.allowance}</span>
        </p>
      )}
    </div>
  </div>
</div>


        {/* Recent Leaves */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-500" /> Recent Leaves
          </h2>

          {leaves.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No leave records found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Leave Type</th>
                    <th className="px-4 py-2 text-left">From</th>
                    <th className="px-4 py-2 text-left">To</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.slice(0, 5).map((leave) => (
                    <tr key={leave._id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-4 py-2">{leave.type}</td>
                      <td className="px-4 py-2">{new Date(leave.from).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{new Date(leave.to).toLocaleDateString()}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                          leave.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                          leave.status === "Approved" ? "bg-green-100 text-green-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {leave.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeSummary;
