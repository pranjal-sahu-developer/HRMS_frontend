import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SalaryDetail = () => {
    const { id } = useParams(); // employee ID from route
    const [salaries, setSalaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSalary = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/api/salary/employee/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                if (res.data.success) setSalaries(res.data.salaries);
            } catch (err) {
                console.error("Error fetching salary:", err);
                setSalaries([]);
            } finally {
                setLoading(false);
            }
        };
        fetchSalary();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Back Button */}
            <button
                onClick={() => navigate("/admin-dashboard/employees")}
                className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
            >
                ← Back to Employee List
            </button>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Salary Detail
            </h2>

            {loading ? (
                <p className="text-center text-gray-500">Loading salary details...</p>
            ) : salaries.length === 0 ? (
                <p className="text-center text-red-500">No salary records found for this employee.</p>
            ) : (
                <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Employee ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Salary
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Allowance
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Deduction
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Salary
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Payment Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {salaries.map((s) => (
                                <tr key={s._id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">{s.employee?.employeeId || "-"}</td>
                                    <td className="px-6 py-4">{s.salary}</td>
                                    <td className="px-6 py-4">{s.allowance}</td>
                                    <td className="px-6 py-4">{s.deduction}</td>
                                    <td className="px-6 py-4">{s.salary + s.allowance - s.deduction}</td>
                                    <td className="px-6 py-4">{new Date(s.paymentDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SalaryDetail;
