import React from "react"
import {BrowserRouter, Navigate, Routes,Route} from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";
import RoleBasedRoutes from "./utils/RoleBasedRoutes.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import AdminSummary from "./components/AdminSummary.jsx";
import DepartmentList from "./components/DepartmentList.jsx";
import AddDepartment from "./components/AddDepartment.jsx";
import EditDepartment from "./components/EditDepartment.jsx";
import EmployeeList from "./components/EmployeeList.jsx";
import AddEmployee from "./components/AddEmployee.jsx";
import ViewEmployee from "./components/ViewEmployee.jsx";
import EditEmployee from "./components/EditEmployee.jsx";
import AddSalary from "./components/AddSalary.jsx";
import SalaryDetail from "./components/SalaryDetail.jsx";
import EmployeeSummary from "./components/EmployeeSummary.jsx";
import UserProfile from "./components/UserProfile.jsx";
import ManageLeave from "./components/ManageLeave.jsx";
import RequestLeave from "./components/RequestLeave.jsx";
import EmployeeSetting from "./components/EmployeeSetting.jsx";
import AdminManageLeaves from "./components/AdminManageLeave.jsx";
import LeaveHistory from "./components/LeaveHistory.jsx";
import EmployeeSalary from "./components/EmployeeSalary.jsx";


function App() {
  return (
   <BrowserRouter>
   <Routes>
      <Route path="/" element={<Navigate to="/admin-dashboard"/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/admin-dashboard" element={
        <PrivateRoutes>
          <RoleBasedRoutes requiredRole={["admin"]}>
            <AdminDashboard/>
          </RoleBasedRoutes>
        </PrivateRoutes>
      }>
        <Route index element={<AdminSummary />} />
        <Route path="/admin-dashboard/departments" element={<DepartmentList />} />
         <Route path="departments/add-department" element={<AddDepartment />} />
         <Route path="departments/edit/:id" element={<EditDepartment />} />  

         <Route path="/admin-dashboard/employees" element={<EmployeeList/>}></Route>
         <Route path="/admin-dashboard/add-employees" element={<AddEmployee/>}></Route>
         <Route path="/admin-dashboard/employee/:id" element={<ViewEmployee />} />
         <Route path="/admin-dashboard/edit-employee/:id" element={<EditEmployee />} />
          <Route path="/admin-dashboard/leave/:id" element={<LeaveHistory />} />

         <Route path="/admin-dashboard/salary" element={<AddSalary/>}></Route>
         <Route path="/admin-dashboard/salary/:id" element={<SalaryDetail />} />

         <Route path="/admin-dashboard/leaves" element={<AdminManageLeaves />} />
        <Route path="/admin-dashboard/settings" element={<EmployeeSetting />} /> 



      </Route>
       <Route path="/employee-dashboard" element={
        <PrivateRoutes>
          <RoleBasedRoutes requiredRole={["admin","employee"]}>
            <EmployeeDashboard/>
          </RoleBasedRoutes>
        </PrivateRoutes>
      }>

       <Route index element={<EmployeeSummary />} />
          <Route path="profile" element={<UserProfile />} /> 
          <Route path="leaves" element={<ManageLeave />} /> 
          <Route path="add-leave" element={<RequestLeave />} /> 
          <Route path="salary" element={<EmployeeSalary/>} /> 
          <Route path="settings" element={<EmployeeSetting />} /> 




      </Route>

    </Routes>
   </BrowserRouter>
  )
}

export default App;
