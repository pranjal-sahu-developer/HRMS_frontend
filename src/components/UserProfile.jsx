import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  const employeeId = localStorage.getItem("userId");

  useEffect(() => {
    if (!employeeId) {
      console.error("No employeeId in localStorage");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/employee/${employeeId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [employeeId]);

  if (loading)
    return <p className="text-center mt-20 text-gray-500 text-xl">Loading profile...</p>;

  if (!employee)
    return <p className="text-center mt-20 text-red-500 text-xl">Profile not found!</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 via-pink-100 to-yellow-100 flex items-center justify-center p-6">
      {/* Profile Card */}
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row transform hover:scale-105 transition-transform duration-300">
        
        {/* Profile Image Section */}
        <div className="md:w-1/3 bg-gradient-to-tr from-blue-400 to-purple-600 flex flex-col items-center justify-center p-8">
          <img
            src={
              employee.userId?.profileImage
                ? `http://localhost:5001/${employee.userId.profileImage}`
                : "https://via.placeholder.com/250"
            }
            alt={employee.userId?.name || "Employee"}
            className="w-64 h-64 rounded-full object-cover border-4 border-white shadow-xl mb-4"
          />
          <h2 className="text-2xl font-bold text-white">{employee.userId?.name}</h2>
          <span className="mt-2 px-4 py-1 bg-yellow-400 text-gray-800 font-semibold rounded-full">
            {employee.userId?.role?.toUpperCase() || "EMPLOYEE"}
          </span>
        </div>

        {/* Details Section */}
        <div className="md:w-2/3 p-10 bg-white">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2">
            Profile Details
          </h1>
          <div className="grid grid-cols-2 gap-6 text-gray-700">
            <div>
              <h2 className="font-semibold text-lg text-purple-600">Employee ID:</h2>
              <p className="text-gray-800">{employee.employeeId || "-"}</p>
            </div>
            <div>
              <h2 className="font-semibold text-lg text-purple-600">Email:</h2>
              <p className="text-gray-800">{employee.userId?.email || "-"}</p>
            </div>
            <div>
              <h2 className="font-semibold text-lg text-purple-600">Date of Birth:</h2>
              <p className="text-gray-800">{employee.dob ? new Date(employee.dob).toLocaleDateString() : "-"}</p>
            </div>
            <div>
              <h2 className="font-semibold text-lg text-purple-600">Gender:</h2>
              <p className="text-gray-800">{employee.gender || "-"}</p>
            </div>
            <div>
              <h2 className="font-semibold text-lg text-purple-600">Department:</h2>
              <p className="text-gray-800">{employee.department?.dep_name || "-"}</p>
            </div>
            <div>
              <h2 className="font-semibold text-lg text-purple-600">Marital Status:</h2>
              <p className="text-gray-800">{employee.maritalStatus || "-"}</p>
            </div>
            <div>
              <h2 className="font-semibold text-lg text-purple-600">Salary:</h2>
              <p className="text-gray-800">{employee.salary ? `₹${employee.salary}` : "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
