import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Users from '../pages/User/Users';
import AddStaff from '../pages/User/AddStaff';
import InputBills from '../pages/Warehouse/InputBills';

const AdminRouter = () => {
    const isAuthenticatedAdmin = localStorage.getItem('isAuthenticatedAdmin') === 'true';

    return (
        <Routes>
            <Route path="/" element={(<Dashboard isAuthenticatedAdmin={isAuthenticatedAdmin} />)} />
            <Route path="/users" element={(<Users />)} />
            <Route path="/add-staff" element={(<AddStaff />)} />
            <Route path="/input-bills" element={<InputBills/>} />
        </Routes>
    )
}

export default AdminRouter