import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditEmployee = () => {
  const { id } = useParams(); // Employee ID from URL
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form fields
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  // Fetch employee data
  useEffect(() => {
  const fetchEmployee = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/employee/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.data.success) {
        const emp = res.data.employee; // ← here
        setEmployee(emp);
        setName(emp.userId?.name || "");
        setEmployeeId(emp.employeeId || "");
        setDesignation(emp.designation || "");
        setDepartment(emp.department?._id || "");
        setSalary(emp.salary || "");
      } else {
        alert("Employee not found");
      }
    } catch (error) {
      console.error("Error fetching employee:", error);
      alert("Employee not found");
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/department/list", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.data.success) {
        setDepartments(res.data.departments);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  fetchEmployee();
  fetchDepartments();
}, [id]);


  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { name, employeeId, designation, department, salary };

      const res = await axios.put(
        `http://localhost:5001/api/employee/update/${id}`,
        payload,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (res.data.success) {
        alert("Employee updated successfully!");
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  if (loading) return <p className="p-6 text-center text-gray-500">Loading...</p>;
  if (!employee) return <p className="p-6 text-center text-red-500">Employee not found</p>;

  return (
    
    <div className="min-h-screen flex justify-center items-start bg-gray-100 py-6">
       
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">

           <button
      onClick={() => navigate("/admin-dashboard/employees")}
      className="mb-4 flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold"
    >
      ← Back 
    </button>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Edit Employee Information
        </h2>

       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Name (readonly) */}
  <div className="flex flex-col">
    <label className="text-gray-700 font-semibold mb-2">Name</label>
    <input
      type="text"
      value={name}
      readOnly
      className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
    />
  </div>

  {/* Employee ID */}
  <div className="flex flex-col">
    <label className="text-gray-700 font-semibold mb-2">Employee ID</label>
    <input
      type="text"
      value={employeeId}
      onChange={(e) => setEmployeeId(e.target.value)}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
      required
    />
  </div>

  {/* Designation */}
  <div className="flex flex-col">
    <label className="text-gray-700 font-semibold mb-2">Designation</label>
    <input
      type="text"
      value={designation}
      onChange={(e) => setDesignation(e.target.value)}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
      required
    />
  </div>

  {/* Department */}
  <div className="flex flex-col">
    <label className="text-gray-700 font-semibold mb-2">Department</label>
    <select
      value={department}
      onChange={(e) => setDepartment(e.target.value)}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
      required
    >
      <option value="">Select Department</option>
      {departments.map((dep) => (
        <option key={dep._id} value={dep._id}>
          {dep.dep_name}
        </option>
      ))}
    </select>
  </div>

  {/* Salary */}
  {/* <div className="flex flex-col">
    <label className="text-gray-700 font-semibold mb-2">Salary</label>
    <input
      type="number"
      value={salary}
      onChange={(e) => setSalary(e.target.value)}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
      required
    />
  </div> */}

  {/* Submit Button */}
  <div className="md:col-span-2 flex justify-center mt-4">
    <button
      type="submit"
      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
    >
      Update Employee
    </button>
  </div>
</form>

      </div>
    </div>
  );
};

export default EditEmployee;
