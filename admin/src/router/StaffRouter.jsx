import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Products from '../pages/Product/Products';
import AddProduct from '../pages/Product/AddProduct';
import EditProduct from '../pages/Product/EditProduct';
import Orders from '../pages/Order/Orders';
import Categories from '../pages/Category/Categories';
import Brands from '../pages/Brand/Brands';
import AddCategory from '../pages/Category/AddCategory';
import AddBrands from '../pages/Brand/AddBrands';
import Dashboard from '../pages/Dashboard';
import { Customers } from '../pages';
import UserSetting from '../pages/UserSetting';
import AddBill from '../pages/Warehouse/AddBill';
import AwaitOrder from '../pages/Order/AwaitOrder';
import AwaitOrderDetail from '../pages/Order/AwaitOrderDetail';
const StaffRouter = () => {
    const isAuthenticatedStaff = localStorage.getItem('isAuthenticatedStaff') === 'true';
    return (
        <Routes>
            <Route path="/" element={(<Dashboard isAuthenticatedStaff={isAuthenticatedStaff} />)} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product" element={<EditProduct />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/add-categories" element={<AddCategory />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/add-brand" element={<AddBrands />} />
            <Route path="/profile" element={<UserSetting />} />
            <Route path="/add-inputbill" element={(<AddBill />)} />
            {/* order */}
            <Route path="/await-order" element={(<AwaitOrder />)} />
            <Route path="/await-orderDetail" element={(<AwaitOrderDetail />)} />
        </Routes>
    )
}

export default StaffRouter