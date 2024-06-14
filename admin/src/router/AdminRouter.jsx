import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Users from '../pages/User/Users';
import AddStaff from '../pages/User/AddStaff';
import AddBill from '../pages/AddBill';

const AdminRouter = () => {
    const isAuthenticatedAdmin = localStorage.getItem('isAuthenticatedAdmin') === 'true';

    return (
        <Routes>
            <Route path="/" element={(<Dashboard isAuthenticatedAdmin={isAuthenticatedAdmin} />)} />
            <Route path="/users" element={(<Users />)} />
            <Route path="/add-staff" element={(<AddStaff />)} />
            <Route path="/add-inputbill" element={(<AddBill />)} />
        </Routes>
    )
}

export default AdminRouter