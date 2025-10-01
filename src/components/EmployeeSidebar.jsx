import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  CalendarCheck,
  DollarSign,
  Settings,
} from "lucide-react";
import { useAuth } from "../context/authContext";

const EmployeeSidebar = () => {
  const { user } = useAuth();

  const menuItems = [
    { name: "Dashboard", path: "/employee-dashboard", icon: <LayoutDashboard size={22} /> },
    { name: "My Profile", path: "/employee-dashboard/profile", icon: <User size={22} /> },
    { name: "Leave", path: "/employee-dashboard/leaves", icon: <CalendarCheck size={22} /> },
    { name: "Salary", path: "/employee-dashboard/salary", icon: <DollarSign size={22} /> },
    { name: "Settings", path: "/employee-dashboard/settings", icon: <Settings size={22} /> },
  ];

  return (
    <aside className="w-72 bg-gradient-to-b from-blue-700 via-blue-400 to-blue-300 text-white min-h-screen p-6 flex flex-col shadow-lg">

       <div className="mb-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-800 to-indigo-400 flex items-center justify-center shadow-xl mb-3 transform hover:scale-105 transition-all duration-300">
                <User size={48} className="text-white" />
              </div>
              <span className="text-lg font-semibold text-white tracking-wide">Employee</span>
            </div>

      {/* Menu */}
      <nav className="flex-1 space-y-3">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-200 transform ${
                isActive
                  ? "bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 text-white shadow-lg scale-105"
                  : "hover:bg-blue-200 hover:text-blue-900 hover:shadow-md hover:scale-105"
              }`
            }
            end
          >
            {item.icon}
            <span className="text-md font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto text-center text-blue-900 text-sm">
        &copy; {new Date().getFullYear()} HRMS
      </div>
    </aside>
  );
};

export default EmployeeSidebar;

// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   User,
//   CalendarCheck,
//   DollarSign,
//   Settings,
// } from "lucide-react";
// import { useAuth } from "../context/authContext";

// const EmployeeSidebar = () => {
//   const { user } = useAuth();

//   const menuItems = [
//     { name: "Dashboard", path: "/employee-dashboard", icon: <LayoutDashboard size={22} /> },
//     { name: "My Profile", path: "/employee-dashboard/profile", icon: <User size={22} /> },
//     { name: "Leave", path: "/employee-dashboard/leaves", icon: <CalendarCheck size={22} /> },
//     { name: "Salary", path: "/employee-dashboard/salary", icon: <DollarSign size={22} /> },
//     { name: "Settings", path: "/employee-dashboard/settings", icon: <Settings size={22} /> },
//   ];

//   return (
//     <aside className="w-72 bg-gradient-to-b from-purple-700 via-purple-600 to-violet-500 text-white min-h-screen p-6 flex flex-col shadow-lg font-sans">
//       {/* Branding */}
//       <div className="mb-10 flex flex-col items-center">
//         <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-xl mb-3 transform hover:scale-105 transition-transform duration-300">
//           <User size={48} className="text-white" />
//         </div>
//         <span className="text-xl font-semibold tracking-wide text-white">Employee</span>
//       </div>

//       {/* Menu */}
//       <nav className="flex-1 space-y-3">
//         {menuItems.map((item, index) => (
//           <NavLink
//             key={index}
//             to={item.path}
//             className={({ isActive }) =>
//               `flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-200 transform ${
//                 isActive
//                   ? "bg-gradient-to-r from-yellow-400 via-pink-400 to-red-500 text-white shadow-lg scale-105"
//                   : "hover:bg-white/20 hover:text-white hover:shadow-md hover:scale-105"
//               }`
//             }
//             end
//           >
//             {item.icon}
//             <span className="text-md font-medium">{item.name}</span>
//           </NavLink>
//         ))}
//       </nav>

//       {/* Footer */}
//       <div className="mt-auto text-center text-white/70 text-sm">
//         &copy; {new Date().getFullYear()} HRMS. All rights reserved.
//       </div>
//     </aside>
//   );
// };

// export default EmployeeSidebar;