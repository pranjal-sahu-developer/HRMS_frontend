// import React, { useState } from 'react'
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/authContext';

// const Login = () => {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState(null);
//   const { login } = useAuth();
//   const navigate = useNavigate();


//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const response = await axios.post("http://localhost:5001/api/auth/login",
//         { email, password }
//       )
//       if (response.data.success) {
//         login(response.data.user);
//         localStorage.setItem("token", response.data.token)
//         if (response.data.user.employeeId) {
//           localStorage.setItem("employeeId", response.data.user.employeeId);
//         }
        
//         localStorage.setItem("userId", response.data.user._id);
//         if (response.data.user.role === "admin") {
//           navigate("/admin-dashboard")
//         } else {
//           navigate("/employee-dashboard")
//         }
//       }
//     } catch (error) {
//       if (error.response && !error.response.data.success) {
//         setError(error.response.data.error)
//       }
//       else {
//         setError("Internal Server Error")
//       }
//     }
//   }

//   return (
//     <div className="bg-green-100 dark:bg-gray-800 h-screen">
//       <div className="container mx-auto px-6 py-16">
//         <h2 className="text-4xl font-bold text-center text-green-800 dark:text-white mb-8">Human Resource Management System</h2>
//         <div className="flex flex-wrap items-center">
//           <div className="w-full md:w-1/2">
//             <h3 className="text-2xl text-green-800 dark:text-white font-bold">Stay connected with us!</h3>
//             <p className="text-green-600 dark:text-gray-400 mt-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus quia molestias delectus reprehenderit sequi iste ut, quod alias. Consequuntur, quis?</p>
//           </div>
//           <div className="w-full md:w-1/2 mt-8 md:mt-0">
//             {error && (
//               <div className="mb-4 p-3 rounded-md bg-red-100 border border-red-400 text-red-700 text-sm">
//                 <span>{error}</span>
//               </div>
//             )}
//             <form action="#" className="bg-white dark:bg-gray-900 rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-green-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="email">Email</label>
//                 <input className="shadow appearance-none border border-green-500 dark:border-gray-700 rounded w-full py-2 px-3 text-green-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} required />
//               </div>
//               <div className="mb-6">
//                 <label className="block text-green-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="password">Password</label>
//                 <input className="shadow appearance-none border border-green-500 dark:border-gray-700 rounded w-full py-2 px-3 text-green-700 dark:text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={(e) => setPassword(e.target.value)} required />
//               </div>
//               <div className="flex items-center justify-between">
//                 <button className="bg-green-500 hover:bg-green-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign In</button>
//                 <a className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800 dark:text-gray-200 dark:hover:text-gray-400" href="#">Forgot Password?</a>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Mail, Lock, LogIn } from "lucide-react"; // icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://hrms-backend-five.vercel.app/api/auth/login",
        { email, password }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.employeeId) {
          localStorage.setItem("employeeId", response.data.user.employeeId);
        }
        localStorage.setItem("userId", response.data.user._id);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Internal Server Error");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="w-full max-w-4xl flex shadow-2xl rounded-2xl overflow-hidden bg-white dark:bg-gray-900">
        {/* Left Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white flex-col items-center justify-center p-10">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Human Resource <br /> Management System
          </h2>
          <p className="text-center text-blue-100 text-sm leading-relaxed">
            Manage employees, boost productivity, and streamline your HR
            operations with a modern platform.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
            Welcome Back
          </h3>

          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-100 border border-red-400 text-red-700 text-sm text-center">
              {error}
            </div>
          )}

          <form action="#" onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" size={18} />
                <input
                  id="username"
                  type="email"
                  placeholder="your@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" size={18} />
                <input
                  id="password"
                  type="password"
                  placeholder="****"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  // minLength={6}
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 rounded-lg shadow-md hover:opacity-90 transition"
            >
              <LogIn size={18} /> Sign In
            </button>
          </form>

          <div className="mt-4 text-center">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;