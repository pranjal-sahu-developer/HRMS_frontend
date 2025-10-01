

import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarCheck,
  DollarSign,
  Settings,
  User
} from "lucide-react";
import { useAuth } from "../context/authContext";

const Sidebar = () => {
  const { user } = useAuth();

  const menuItems = [
    { name: "Dashboard", path: "/admin-dashboard", icon: <LayoutDashboard size={22} /> },
    { name: "Employees", path: "/admin-dashboard/employees", icon: <Users size={22} /> },
    { name: "Departments", path: "/admin-dashboard/departments", icon: <Building2 size={22} /> },
    { name: "Leaves", path: "/admin-dashboard/leaves", icon: <CalendarCheck size={22} /> },
    { name: "Salary", path: "/admin-dashboard/salary", icon: <DollarSign size={22} /> },
    { name: "Settings", path: "/admin-dashboard/settings", icon: <Settings size={22} /> },
  ];

  return (
    <aside className="w-72 bg-gradient-to-b from-red-800 via-red-500 to-red-400 text-white min-h-screen p-6 flex flex-col shadow-lg">
      {/* Branding */}
      <div className="mb-6 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-400 to-indigo-500 flex items-center justify-center shadow-xl mb-3 transform hover:scale-105 transition-all duration-300">
          <User size={48} className="text-white" />
        </div>
        <span className="text-lg font-semibold text-white tracking-wide">Admin</span>
      </div>
      {/* Menu */}
      <nav className="flex-1 space-y-3">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-200 transform ${isActive
                ? "bg-gradient-to-r from-yellow-400 via-pink-400 to-red-500 text-white shadow-lg scale-105"
                : "hover:bg-orange-200 hover:text-orange-900 hover:shadow-md hover:scale-105"
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
      <div className="mt-auto text-center text-orange-900 text-sm">
        &copy; {new Date().getFullYear()} HRMS
      </div>
    </aside>
  );
};

export default Sidebar;

// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Users,
//   Building2,
//   CalendarCheck,
//   DollarSign,
//   Settings,
//   User,
// } from "lucide-react";
// import { useAuth } from "../context/authContext";

// const Sidebar = () => {
//   const { user } = useAuth();

//   const menuItems = [
//     { name: "Dashboard", path: "/admin-dashboard", icon: <LayoutDashboard size={22} /> },
//     { name: "Employees", path: "/admin-dashboard/employees", icon: <Users size={22} /> },
//     { name: "Departments", path: "/admin-dashboard/departments", icon: <Building2 size={22} /> },
//     { name: "Leaves", path: "/admin-dashboard/leaves", icon: <CalendarCheck size={22} /> },
//     { name: "Salary", path: "/admin-dashboard/salary", icon: <DollarSign size={22} /> },
//     { name: "Settings", path: "/admin-dashboard/settings", icon: <Settings size={22} /> },
//   ];

//   return (
//     <aside className="w-72 bg-gray-900 text-gray-100 min-h-screen p-6 flex flex-col shadow-xl font-sans">
//       {/* Branding */}
//       <div className="mb-8 flex flex-col items-center">
//         <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center shadow-2xl mb-3 transform hover:scale-105 transition-transform duration-300">
//           <User size={48} className="text-white" />
//         </div>
//         <span className="text-xl font-bold tracking-wide text-white">Admin Panel</span>
//       </div>

//       {/* Menu */}
//       <nav className="flex-1 space-y-3">
//         {menuItems.map((item, index) => (
//           <NavLink
//             key={index}
//             to={item.path}
//             className={({ isActive }) =>
//               `flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-200 transform text-gray-100 ${
//                 isActive
//                   ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
//                   : "hover:bg-gray-700 hover:text-white hover:shadow-md hover:scale-105"
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
//       <div className="mt-auto text-center text-gray-400 text-sm">
//         &copy; {new Date().getFullYear()} HRMS. All rights reserved.
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;