import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

const ViewEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/employee/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                if (response.data.success) setEmployee(response.data.employee);
            } catch (error) {
                console.error("Error fetching employee:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    if (loading) return <p className="text-center mt-20 text-gray-500">Loading employee...</p>;
    if (!employee) return <p className="text-center mt-20 text-red-500">Employee not found!</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center mb-6 text-gray-700 hover:text-gray-900 font-semibold"
            >
                <ArrowLeft className="w-5 h-5 mr-2" /> Back
            </button>

            {/* Heading */}
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
                Employee Details
            </h1>

            {/* Profile + Details */}
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                    <img
                        src={
                            employee.userId?.profileImage
                                ? `http://localhost:5001/${employee.userId.profileImage}`
                                : "https://via.placeholder.com/200"
                        }
                        alt={employee.userId?.name || "Employee"}
                        className="w-64 h-64 rounded-xl object-cover border-4 border-green-500 shadow-md"
                    />
                </div>

                {/* Employee Details */}
                <div className="flex-1 w-full">
                    <div className="grid grid-cols-2 gap-6 text-gray-700">
                        <div>
                            <h2 className="font-semibold text-lg">Name:</h2>
                            <p className="text-gray-800">{employee.userId?.name || "-"}</p>
                        </div>
                        <div>
                            <h2 className="font-semibold text-lg">Employee ID:</h2>
                            <p className="text-gray-800">{employee.employeeId || "-"}</p>
                        </div>
                        <div>
                            <h2 className="font-semibold text-lg">Date of Birth:</h2>
                            <p className="text-gray-800">{employee.dob ? new Date(employee.dob).toLocaleDateString() : "-"}</p>
                        </div>
                        <div>
                            <h2 className="font-semibold text-lg">Gender:</h2>
                            <p className="text-gray-800">{employee.gender || "-"}</p>
                        </div>
                        <div>
                            <h2 className="font-semibold text-lg">Department:</h2>
                            <p className="text-gray-800">{employee.department?.dep_name || "-"}</p>
                        </div>
                        <div>
                            <h2 className="font-semibold text-lg">Marital Status:</h2>
                            <p className="text-gray-800">{employee.maritalStatus || "-"}</p>
                        </div>
                        <div>
                            <h2 className="font-semibold text-lg">Role:</h2>
                            <p className="text-gray-800">{employee.userId?.role || "-"}</p>
                        </div>
                        <div>
                            <h2 className="font-semibold text-lg">Salary:</h2>
                            <p className="text-gray-800">{employee.salary ? `${employee.salary}` : "-"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewEmployee;
