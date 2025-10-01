// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AddSalary = () => {
//     const [departments, setDepartments] = useState([]);
//     const [employees, setEmployees] = useState([]);
//     const [selectedDepartment, setSelectedDepartment] = useState("");
//     const [selectedEmployee, setSelectedEmployee] = useState("");
//     const [salary, setSalary] = useState("");
//     const [allowance, setAllowance] = useState("");
//     const [deduction, setDeduction] = useState("");
//     const [paymentDate, setPaymentDate] = useState("");

//     // Fetch Departments
//     useEffect(() => {
//         const fetchDepartments = async () => {
//             try {
//                 const res = await axios.get("http://localhost:5001/api/department/list", {
//                     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//                 });
//                 setDepartments(res.data.departments || []);
//             } catch (err) {
//                 console.error("Error fetching departments:", err);
//             }
//         };
//         fetchDepartments();
//     }, []);

//     // Fetch Employees based on department
//     useEffect(() => {
//         if (!selectedDepartment) return;
//         const fetchEmployees = async () => {
//             try {
//                 const res = await axios.get(
//                     `http://localhost:5001/api/employee/by-department/${selectedDepartment}`,
//                     { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//                 );
//                 setEmployees(res.data.employees || []);
//             } catch (err) {
//                 console.error("Error fetching employees:", err);
//             }
//         };
//         fetchEmployees();
//     }, [selectedDepartment]);

//     // Handle Submit
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const payload = {
//                 department: selectedDepartment,
//                 employee: selectedEmployee,
//                 salary,
//                 allowance,
//                 deduction,
//                 paymentDate
//             };

//             const res = await axios.post("http://localhost:5001/api/salary/add", payload, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//             });

//             if (res.data.success) {
//                 alert("Salary added successfully!");
//                 // reset form
//                 setSelectedDepartment("");
//                 setSelectedEmployee("");
//                 setSalary("");
//                 setAllowance("");
//                 setDeduction("");
//                 setPaymentDate("");
//             }
//         } catch (err) {
//             console.error("Error adding salary:", err);
//             alert("Something went wrong while adding salary");
//         }
//     };

//     return (
//         <div className="min-h-screen flex justify-center items-start bg-gray-100 py-8">
//             <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-4xl">
//                 <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
//                     Add New Salary
//                 </h2>

//                 <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
//                     {/* Department */}
//                     <div className="flex flex-col">
//                         <label className="text-gray-700 font-semibold mb-1">Department</label>
//                         <select
//                             value={selectedDepartment}
//                             onChange={(e) => setSelectedDepartment(e.target.value)}
//                             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
//                             required
//                         >
//                             <option value="">Select Department</option>
//                             {departments.map((dep) => (
//                                 <option key={dep._id} value={dep._id}>
//                                     {dep.dep_name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Employee */}
//                     <div className="flex flex-col">
//                         <label className="text-gray-700 font-semibold mb-1">Employee</label>
//                         <select
//                             value={selectedEmployee}
//                             onChange={(e) => setSelectedEmployee(e.target.value)}
//                             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
//                             required
//                             disabled={!selectedDepartment}
//                         >
//                             <option value="">Select Employee</option>
//                             {employees.map((emp) => (
//                                 <option key={emp._id} value={emp._id}>
//                                     {emp.userId?.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Salary */}
//                     <div className="flex flex-col">
//                         <label className="text-gray-700 font-semibold mb-1">Salary</label>
//                         <input
//                             type="number"
//                             value={salary}
//                             onChange={(e) => setSalary(e.target.value)}
//                             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
//                             required
//                         />
//                     </div>

//                     {/* Allowance */}
//                     <div className="flex flex-col">
//                         <label className="text-gray-700 font-semibold mb-1">Allowance</label>
//                         <input
//                             type="number"
//                             value={allowance}
//                             onChange={(e) => setAllowance(e.target.value)}
//                             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
//                         />
//                     </div>

//                     {/* Deduction */}
//                     <div className="flex flex-col">
//                         <label className="text-gray-700 font-semibold mb-1">Deduction</label>
//                         <input
//                             type="number"
//                             value={deduction}
//                             onChange={(e) => setDeduction(e.target.value)}
//                             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
//                         />
//                     </div>

//                     {/* Payment Date */}
//                     <div className="flex flex-col">
//                         <label className="text-gray-700 font-semibold mb-1">
//                             Payment Date (Salary will be paid on this date every month)
//                         </label>
//                         <input
//                             type="number"
//                             min="1"
//                             max="31"
//                             value={paymentDate}
//                             onChange={(e) => setPaymentDate(e.target.value)}
//                             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
//                             placeholder="Enter day of the month (1-31)"
//                             required
//                         />
//                         <small className="text-gray-500">
//                             Salary will be paid on this day of every month
//                         </small>
//                     </div>


//                     {/* Submit */}
//                     <div className="col-span-2 flex justify-center mt-4">
//                         <button
//                             type="submit"
//                             className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-10 rounded-lg shadow-md transition"
//                         >
//                             Add Salary
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddSalary;

import React, { useState, useEffect } from "react";
import axios from "axios";

const AddSalary = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [salary, setSalary] = useState("");
  const [allowance, setAllowance] = useState("");
  const [deduction, setDeduction] = useState("");
  const [paymentDate, setPaymentDate] = useState("");

  // Fetch Departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/department/list", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setDepartments(res.data.departments || []);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };
    fetchDepartments();
  }, []);

  // Fetch Employees based on department
  useEffect(() => {
    if (!selectedDepartment) return;
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/employee/by-department/${selectedDepartment}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setEmployees(res.data.employees || []);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, [selectedDepartment]);

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        department: selectedDepartment,
        employee: selectedEmployee,
        salary,
        allowance,
        deduction,
        paymentDate,
      };

      const res = await axios.post("http://localhost:5001/api/salary/add", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (res.data.success) {
        alert("Salary added successfully!");
        // Reset form
        setSelectedDepartment("");
        setSelectedEmployee("");
        setSalary("");
        setAllowance("");
        setDeduction("");
        setPaymentDate("");
      }
    } catch (err) {
      console.error("Error adding salary:", err);
      alert("Something went wrong while adding salary");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gradient-to-br from-orange-50 to-orange-100 py-10">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-orange-800 mb-10">
          Add New Salary
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Department */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
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

          {/* Employee */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Employee</label>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              required
              disabled={!selectedDepartment}
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.userId?.name}
                </option>
              ))}
            </select>
          </div>

          {/* Salary */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Salary</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              required
            />
          </div>

          {/* Allowance */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Allowance</label>
            <input
              type="number"
              value={allowance}
              onChange={(e) => setAllowance(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>

          {/* Deduction */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Deduction</label>
            <input
              type="number"
              value={deduction}
              onChange={(e) => setDeduction(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>

          {/* Payment Date */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Payment Date</label>
            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              required
            />
            <small className="text-gray-500 mt-1">
              Select the date for monthly salary payment
            </small>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-12 rounded-xl shadow-lg transition transform hover:scale-105"
            >
              Add Salary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSalary;
