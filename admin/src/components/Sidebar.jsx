import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdKeyboardArrowDown, MdKeyboardArrowRight, MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { adminlinks, stafflinks } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import logoImg from '../assets/images/logo/Logo.png';
import { fetchOrder } from '../data/api';
import { Badge } from 'antd';


const Sidebar = ({ isAuthenticatedAdmin, isAuthenticatedStaff }) => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [orders, setOrders] = useState([]);


  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const toggleSubmenu = (name) => {
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };


  const sidebarRef = useRef(null);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (sidebar) {
      sidebar.style.overflow = 'hidden';
      sidebar.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
          sidebar.scrollTop += e.deltaY;
          e.preventDefault();
        }
      });
    }
    return () => {
      if (sidebar) {
        sidebar.removeEventListener('wheel', null);
      }
    };
  }, []);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const orderData = await fetchOrder();
        setOrders(orderData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    getOrders();
  }, []);

  const awaitOrderCount = orders.filter(order => order.order.status === 0).length;


  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div
      className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10"
      style={{
        overflow: 'auto',
        msOverflowStyle: 'none',  /* Internet Explorer 10+ */
        scrollbarWidth: 'none'  /* Firefox */
      }}
    >
      <style>
        {`
        ::-webkit-scrollbar {
          display: none;  /* Safari and Chrome */
        }
      `}
      </style>
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <span className='w-full my-2'>
                <img src={logoImg} alt="logo" />
              </span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>


          {isAuthenticatedAdmin && (
            <div className="mt-10">
              {adminlinks.map((item, itemIndex) => (
                <div key={item.title} className={`relative ${itemIndex < adminlinks.length - 1 ? 'pb-4 mb-4 border-b border-gray-300 dark:border-gray-700' : ''}`}>
                  <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                    {item.title}
                  </p>
                  {item.links.map((link) => (
                    <div key={link.name} className="relative mb-2">
                      <NavLink
                        to={link.path || `/${link.name}`}
                        onClick={link.type === 'sub' ? (e) => { e.preventDefault(); toggleSubmenu(link.name); } : handleCloseSideBar}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : '',
                        })}
                        className={({ isActive }) => (isActive ? activeLink : normalLink)}
                      >
                        {link.icon}
                        <span className="capitalize">{link.name}</span>
                        {link.type === 'sub' && (
                          activeSubmenu === link.name ? <MdKeyboardArrowDown className="ml-auto" style={{ fontSize: '24px' }} /> :
                            <MdKeyboardArrowRight className="ml-auto" style={{ fontSize: '24px' }} />
                        )}
                      </NavLink>
                      {link.type === 'sub' && activeSubmenu === link.name && (
                        <div className="rounded-lg mt-2 ml-4 pl-4">
                          {link.subLinks.map((subLink) => (
                            <NavLink
                              to={`/${subLink.path || subLink.name}`}
                              key={subLink.name}
                              onClick={handleCloseSideBar}
                              style={({ isActive }) => ({
                                backgroundColor: isActive ? currentColor : '',
                              })}
                              className={({ isActive }) => (isActive ? activeLink : normalLink)}
                            >

                              {subLink.icon}
                              <span className="capitalize">{subLink.label}</span>
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>)}
          {isAuthenticatedStaff && (
            <div className="mt-10">
              {stafflinks.map((item, itemIndex) => (
                <div key={item.title} className={`relative ${itemIndex < stafflinks.length - 1 ? 'pb-4 mb-4 border-b border-gray-300 dark:border-gray-700' : ''}`}>
                  <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                    {item.title}
                  </p>
                  {item.links.map((link) => (
                    <div key={link.name} className="relative mb-2">
                      <NavLink
                        to={link.path || `/${link.name}`}
                        onClick={link.type === 'sub' ? (e) => { e.preventDefault(); toggleSubmenu(link.name); } : handleCloseSideBar}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : '',
                        })}
                        className={({ isActive }) => (isActive ? activeLink : normalLink)}
                      >
                        {(link.name === 'Quản lý đơn hàng' && awaitOrderCount > 0)?(
                          <Badge dot>
                            {link.icon}
                          </Badge>
                        ): link.icon}
                        <span className="capitalize">{link.name}</span>
                        {link.type === 'sub' && (
                          activeSubmenu === link.name ? <MdKeyboardArrowDown className="ml-auto" style={{ fontSize: '24px' }} /> :
                            <MdKeyboardArrowRight className="ml-auto" style={{ fontSize: '24px' }} />
                        )}
                      </NavLink>
                      {link.type === 'sub' && activeSubmenu === link.name && (
                        <div className="rounded-lg mt-2 ml-4 pl-4">
                          {link.subLinks.map((subLink) => (
                            <NavLink
                              to={`/${subLink.path || subLink.name}`}
                              key={subLink.name}
                              onClick={handleCloseSideBar}
                              style={({ isActive }) => ({
                                backgroundColor: isActive ? currentColor : '',
                              })}
                              className={({ isActive }) => (isActive ? activeLink : normalLink)}
                            >
                              {subLink.name === 'await-order' ? (
                                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'  }}>
                                  <span className="capitalize" >{subLink.label}</span>
                                  <Badge style={{ marginLeft: '30px' }} count={awaitOrderCount} />
                                </div>
                              ) : (
                                <>
                                  {subLink.icon}
                                  <span className="capitalize">{subLink.label}</span>
                                </>
                              )}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>)}
        </>
      )}
    </div>
  );
};

export default Sidebar;
