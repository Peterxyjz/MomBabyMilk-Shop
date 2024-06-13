import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Sidebar, ThemeSettings } from './components';
import { Ecommerce, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import LoginPage from './pages/Login/LoginPage';
import ForgotPassword from './pages/Login/ForgotPassword';
import Otp from './pages/Login/Otp';
import ResetPassword from './pages/Login/ResetPassword';
import Products from './pages/Product/Products';
import AddProduct from './pages/Product/AddProduct';
import EditProduct from './pages/Product/EditProduct';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';

import Orders from './pages/Order/Orders';
import Categories from './pages/Category/Categories';
import Brands from './pages/Brand/Brands';
import AddCategory from './pages/Category/AddCategory';
import AddBrands from './pages/Brand/AddBrands';
import Dashboard from './pages/Dashboard';
import Users from './pages/User/Users';
import AddStaff from './pages/User/AddStaff';
import AddBill from './pages/AddBill';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const isAuthenticatedAdmin = localStorage.getItem('isAuthenticatedAdmin') === 'true';
  const isAuthenticatedStaff = localStorage.getItem('isAuthenticatedStaff') === 'true';

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {isAuthenticatedStaff ? (
            <>
              <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                <TooltipComponent
                  content="Settings"
                  position="Top"
                >
                  <button
                    type="button"
                    onClick={() => setThemeSettings(true)}
                    style={{ background: currentColor, borderRadius: '50%' }}
                    className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                  >
                    <FiSettings />
                  </button>

                </TooltipComponent>
              </div>
              {activeMenu ? (
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                  <Sidebar  isAuthenticatedStaff={isAuthenticatedStaff} />
                </div>
              ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                  <Sidebar isAuthenticatedStaff={isAuthenticatedStaff}  />
                </div>
              )}
              <div
                className={
                  activeMenu
                    ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                    : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                }
              >
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                  <Navbar isAuthenticatedStaff={isAuthenticatedStaff} />
                </div>
                <div>
                  {themeSettings && (<ThemeSettings />)}

                  <Routes>
                    <Route path="/" element={(<Orders />)} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/edit-product" element={<EditProduct />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/add-categories" element={<AddCategory />} />
                    <Route path="/brands" element={<Brands />} />
                    <Route path="/add-brand" element={<AddBrands />} />
                  </Routes>
                </div>
              </div>
            </>
          ) : isAuthenticatedAdmin ? (
            <>
              <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                <TooltipComponent
                  content="Settings"
                  position="Top"
                >
                  <button
                    type="button"
                    onClick={() => setThemeSettings(true)}
                    style={{ background: currentColor, borderRadius: '50%' }}
                    className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                  >
                    <FiSettings />
                  </button>

                </TooltipComponent>
              </div>
              {activeMenu ? (
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                  <Sidebar isAuthenticatedAdmin={isAuthenticatedAdmin} />
                </div>
              ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                  <Sidebar isAuthenticatedAdmin={isAuthenticatedAdmin} />
                </div>
              )}
              <div
                className={
                  activeMenu
                    ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                    : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                }
              >
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                  <Navbar isAuthenticatedAdmin={isAuthenticatedAdmin} />
                </div>
                <div>
                  {themeSettings && (<ThemeSettings />)}

                  <Routes>
                    <Route path="/" element={(<Dashboard />)} />
                    <Route path="/users" element={(<Users />)} />
                    <Route path="/add-staff" element={(<AddStaff />)} />
                    <Route path="/add-inputbill" element={(<AddBill />)} />

                  </Routes>
                </div>
              </div>
            </>
          ) : (
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/otp" element={<Otp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )

          }
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
