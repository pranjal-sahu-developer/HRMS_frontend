import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();

  // Employee form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState(""); // store department id
  const [departments, setDepartments] = useState([]);
  const [salary, setSalary] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);

  // Fetch departments from database
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/department/list", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setDepartments(response.data.departments);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const formData = new FormData();
    //   formData.append("name", name);
    //   formData.append("email", email);
    //   formData.append("employeeId", employeeId);
    //   formData.append("dob", dob);
    //   formData.append("gender", gender);
    //   formData.append("maritalStatus", maritalStatus);
    //   formData.append("designation", designation);
    //   formData.append("department", department); // send department _id
    //   formData.append("salary", salary);
    //   formData.append("password", password);
    //   formData.append("role", role);
    //   if (image) formData.append("image", image);

    //   const response = await axios.post(
    //     "http://localhost:5001/api/employee/add",
    //     formData,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );

    //   if (response.data.success) {
    //     alert("✅ Employee added successfully!");
    //     navigate("/admin-dashboard/employees");
    //   }
    // } catch (error) {
    //   console.error("Error adding employee:", error);
    //   alert(error.response?.data?.error || "Something went wrong");
    // }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("❌ Please enter a valid email address.");
    return;
  }

     if (password.length < 6) {
    alert("❌ Password must be at least 6 characters long.");
    return;
  }

  // --- File validation ---
  if (image) {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(image.type)) {
      alert("❌ Only JPG and PNG images are allowed.");
      return;
    }
    if (image.size > 2 * 1024 * 1024) {
      alert("❌ File size should not exceed 2MB.");
      return;
    }
  }

  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("employeeId", employeeId);
    formData.append("dob", dob);
    formData.append("gender", gender);
    formData.append("maritalStatus", maritalStatus);
    formData.append("designation", designation);
    formData.append("department", department);
    formData.append("salary", salary);
    formData.append("password", password);
    formData.append("role", role);
    if (image) formData.append("image", image);

    const response = await axios.post(
      "http://localhost:5001/api/employee/add",
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success) {
      alert("✅ Employee added successfully!");
      navigate("/admin-dashboard/employees");
    }
  } catch (error) {
    console.error("Error adding employee:", error);
    alert(error.response?.data?.error || "Something went wrong");
  }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 py-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl">
          <button
      onClick={() => navigate("/admin-dashboard/employees")}
      className="mb-4 flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold"
    >
      ← Back 
    </button>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add New Employee
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          />
          <input
            type="text"
            placeholder="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          />
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          >
            <option value="">Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
          <input
            type="text"
            placeholder="Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          />
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.dep_name}
              </option>
            ))}
          </select>
          {/* <input
            type="number"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          /> */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition col-span-2"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md col-span-2"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
