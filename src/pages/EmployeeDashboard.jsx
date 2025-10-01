import React from 'react'
import EmployeeSidebar from '../components/EmployeeSidebar'
import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom";


const EmployeeDashboard = () => {
  return (
        <div className="h-screen flex flex-col">
      {/* Navbar at top */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar on the left */}
        <EmployeeSidebar />

        {/* Main Content on the right */}
        <main className="flex-1 bg-gray-100 overflow-y-auto">
          <div className="p-6">
            <Outlet /> {/* Nested routes ka content yahan render hoga */}
          </div>
        </main>
      </div>
    </div>
  )
}

export default EmployeeDashboard
