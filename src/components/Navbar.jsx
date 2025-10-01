// import React from "react";
// import { useAuth } from "../context/authContext";
// import { LogOut } from "lucide-react";

// const Navbar = () => {
//   const { user, logout } = useAuth();

//   return (
//     <nav className="bg-gray-900 text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
          
//           {/* Logo / Brand */}
//           <div className="flex items-center">
//             <h1 className="text-xl font-bold tracking-wide">Human Resource Management System</h1>
//           </div>

//           {/* Right Side - User Info */}
//           <div className="flex items-center gap-6">
//             {user && (
//               <div className="flex items-center gap-3">
//                 <span className="text-sm text-gray-300">
//                   Welcome, <span className="font-semibold">{user.name}</span>
//                 </span>
//               </div>
//             )}
//             <button
//               onClick={logout}
//               className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-md text-sm font-medium"
//             >
//               <LogOut size={16} />
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React from "react";
import { useAuth } from "../context/authContext";
import { LogOut, UserCircle2 } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-red-800 via-blue-800 to-blue-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / Brand */}
          <div className="flex items-center">
            <h1 className="text-xl font-extrabold tracking-wide drop-shadow-md">
              HR<span className="text-yellow-300">MS</span>
            </h1>
            <span className="ml-3 text-sm font-medium text-orange-100 hidden sm:block">
              Human Resource Management System
            </span>
          </div>

          {/* Right Side - User Info */}
          <div className="flex items-center gap-6">
            {user && (
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg shadow-md">
                <UserCircle2 size={22} className="text-yellow-300" />
                <span className="text-sm">
                  Welcome,{" "}
                  <span className="font-semibold text-yellow-200">
                    {user.name}
                  </span>
                </span>
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium shadow-md transition transform hover:scale-105"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
