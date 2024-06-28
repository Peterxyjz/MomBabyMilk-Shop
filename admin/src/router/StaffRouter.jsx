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
import ApprovedOrder from '../pages/Order/ApprovedOrder';
import CancelOrder from '../pages/Order/CancelOrder';
import CompleteOrder from '../pages/Order/CompleteOrder';
import OrderDetail from '../pages/Order/OrderDetail';
import EditCategory from '../pages/Category/EditCategory';
import InputBills from '../pages/Warehouse/InputBills';
import BillDetail from '../pages/Warehouse/BillDetail';
import AddVoucher from '../pages/Voucher/AddVoucher';
const StaffRouter = () => {
    const isAuthenticatedStaff = localStorage.getItem('isAuthenticatedStaff') === 'true';
    return (
        <Routes>
            <Route path="/" element={(<Dashboard isAuthenticatedStaff={isAuthenticatedStaff} />)} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/profile" element={<UserSetting />} />
            {/* order */}
            <Route path="/await-order" element={(<AwaitOrder />)} />
            <Route path="/await-orderDetail" element={(<AwaitOrderDetail />)} />
            <Route path="/approved-order" element={(<ApprovedOrder />)} />
            <Route path="/cancel-order" element={(<CancelOrder />)} />
            <Route path="/complete-order" element={(<CompleteOrder />)} />
            <Route path="/order-detail" element={(<OrderDetail />)} />
            <Route path="/orders" element={(<Orders />)} />
            {/* product */}
            <Route path="/products" element={<Products />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product" element={<EditProduct />} />
            {/* brand */}
            <Route path="/brands" element={<Brands />} />
            <Route path="/add-brand" element={<AddBrands />} />
            {/* category */}
            <Route path="/categories" element={<Categories />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/edit-category" element={<EditCategory />} />
            {/* warehouse */}
            <Route path="/add-inputbill" element={(<AddBill />)} />
            <Route path="/input-bills" element={<InputBills/>} />
            <Route path="/bill-detail" element={<BillDetail/>} />
            {/* voucher */}
            <Route path="/add-voucher" element={<AddVoucher/>} />
        </Routes>
    )
}

export default StaffRouter